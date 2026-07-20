<?php
/**
 * backend/api/dados-produtos.php
 * -----------------------------------------------------------------------
 * Substitui o antigo arquivo mockado Dados/dados-produtos.js.
 *
 * Em vez de um array fixo no código, este script consulta a tabela
 * `produtos` (MySQL) e imprime JavaScript válido definindo a mesma
 * variável global `produtos`, com exatamente a mesma forma que o
 * restante do front-end (loja_script.js, setup_script.js,
 * busca-global.js) já espera. Assim, basta trocar o <script src="...">
 * de "./Dados/dados-produtos.js" para
 * "../backend/api/dados-produtos.php" em cada página — nenhum outro
 * arquivo JS precisa ser alterado.
 *
 * Cache-Control curto evita ficar servindo catálogo desatualizado depois
 * de uma alteração no banco, mas ainda permite algum reaproveitamento.
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

require __DIR__ . '/../config/database.php';

header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = nexus_db();
    $linhas = $pdo->query(
        'SELECT id, categoria, nome, score, preco_original, preco_promocao, imagem, video, especificacoes
         FROM produtos
         ORDER BY id'
    )->fetchAll();
} catch (Throwable $e) {
    error_log('[dados-produtos.php] ' . $e->getMessage());
    http_response_code(500);
    echo "console.error('Falha ao carregar produtos do servidor.'); const produtos = [];";
    exit;
}

function formatarPrecoBr(?string $valor): ?string
{
    if ($valor === null) {
        return null;
    }
    return number_format((float) $valor, 2, ',', '.');
}

$produtos = array_map(function (array $p): array {
    return [
        'id'             => (int) $p['id'],
        'categoria'      => $p['categoria'],
        'nome'           => $p['nome'],
        'score'          => (int) $p['score'],
        'precoOriginal'  => formatarPrecoBr($p['preco_original']),
        'precoPromocao'  => formatarPrecoBr($p['preco_promocao']),
        'imagem'         => $p['imagem'],
        'video'          => $p['video'],
        'especificacoes' => $p['especificacoes'] !== null ? json_decode($p['especificacoes']) : new stdClass(),
    ];
}, $linhas);

echo '// Gerado dinamicamente a partir do banco de dados MySQL (tabela produtos)' . PHP_EOL;
echo 'const produtos = ' . json_encode($produtos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . ';' . PHP_EOL;
