<?php
/**
 * backend/seed/seed.php
 * -----------------------------------------------------------------------
 * Popula as tabelas `produtos` e `jogos` a partir dos arquivos
 * produtos.json e jogos.json (nesta mesma pasta), que são uma conversão
 * 1:1 dos antigos arrays mockados Dados/dados-produtos.js e
 * Dados/dados-jogos.js.
 *
 * Rode uma única vez (ou sempre que quiser resetar o catálogo) via CLI:
 *
 *   php backend/seed/seed.php
 *
 * O script é idempotente: apaga e recria os dados de produtos e jogos
 * a cada execução (não mexe em usuarios/pedidos).
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

require __DIR__ . '/../config/database.php';

$pdo = nexus_db();

$produtos = json_decode(file_get_contents(__DIR__ . '/produtos.json'), true);
$jogos    = json_decode(file_get_contents(__DIR__ . '/jogos.json'), true);

if (!is_array($produtos) || !is_array($jogos)) {
    fwrite(STDERR, "Falha ao ler produtos.json / jogos.json\n");
    exit(1);
}

function converterPrecoBr(?string $valor): ?float
{
    if ($valor === null || trim($valor) === '') {
        return null;
    }
    // Remove qualquer coisa que não seja dígito, ponto ou vírgula (cobre
    // casos como "R$ 749,00" ou espaços acidentais no dado de origem).
    $limpo = preg_replace('/[^\d,\.]/', '', $valor);
    $limpo = str_replace('.', '', $limpo);
    $limpo = str_replace(',', '.', $limpo);
    return $limpo === '' ? null : (float) $limpo;
}

// TRUNCATE é DDL e causa commit implícito no MySQL, então roda antes
// de abrir a transação (senão o rollback/commit posterior falha).
$pdo->exec('SET FOREIGN_KEY_CHECKS=0');
$pdo->exec('TRUNCATE TABLE produtos');
$pdo->exec('TRUNCATE TABLE jogos');
$pdo->exec('SET FOREIGN_KEY_CHECKS=1');

$pdo->beginTransaction();

try {
    // -------- PRODUTOS --------
    $insertProduto = $pdo->prepare(
        'INSERT INTO produtos (id, categoria, nome, score, preco_original, preco_promocao, imagem, video, especificacoes)
         VALUES (:id, :categoria, :nome, :score, :preco_original, :preco_promocao, :imagem, :video, :especificacoes)'
    );

    foreach ($produtos as $p) {
        $insertProduto->execute([
            'id'             => $p['id'],
            'categoria'      => $p['categoria'],
            'nome'           => $p['nome'],
            'score'          => $p['score'] ?? 0,
            'preco_original' => converterPrecoBr($p['precoOriginal'] ?? null),
            'preco_promocao' => converterPrecoBr($p['precoPromocao'] ?? null),
            'imagem'         => $p['imagem'] ?? null,
            'video'          => $p['video'] ?? null,
            'especificacoes' => json_encode(
                empty($p['especificacoes']) ? new stdClass() : $p['especificacoes'],
                JSON_UNESCAPED_UNICODE
            ),
        ]);
    }

    // -------- JOGOS --------
    $insertJogo = $pdo->prepare(
        'INSERT INTO jogos (nome, imagem, categoria, estrelas, nota, peso, tags, specs)
         VALUES (:nome, :imagem, :categoria, :estrelas, :nota, :peso, :tags, :specs)'
    );

    foreach ($jogos as $j) {
        $insertJogo->execute([
            'nome'      => $j['nome'],
            'imagem'    => $j['imagem'] ?? null,
            'categoria' => $j['categoria'] ?? null,
            'estrelas'  => $j['estrelas'] ?? null,
            'nota'      => $j['nota'] ?? null,
            'peso'      => $j['peso'] ?? 1.0,
            'tags'      => $j['tags'] !== null ? json_encode($j['tags'], JSON_UNESCAPED_UNICODE) : null,
            'specs'     => $j['specs'] !== null ? json_encode($j['specs'], JSON_UNESCAPED_UNICODE) : null,
        ]);
    }

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    fwrite(STDERR, 'Erro ao popular o banco: ' . $e->getMessage() . "\n");
    exit(1);
}

printf("Seed concluído: %d produtos e %d jogos inseridos.\n", count($produtos), count($jogos));
