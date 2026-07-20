<?php
/**
 * backend/api/dados-jogos.php
 * -----------------------------------------------------------------------
 * Substitui o antigo arquivo mockado Dados/dados-jogos.js.
 *
 * Consulta a tabela `jogos` (MySQL) e imprime JavaScript válido definindo
 * as duas variáveis globais que o front-end espera:
 *   - catalogoBase  -> usada em Jogos_Page/jogos.html (ficha completa)
 *   - catalogoJogos -> usada em Setup_Page/setup.html (nome + peso, p/ FPS)
 *
 * Basta trocar o <script src="./Dados/dados-jogos.js"> para
 * "../backend/api/dados-jogos.php" em cada página.
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

require __DIR__ . '/../config/database.php';

header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: public, max-age=60');

try {
    $pdo = nexus_db();
    $linhas = $pdo->query(
        'SELECT nome, imagem, categoria, estrelas, nota, peso, tags, specs
         FROM jogos
         ORDER BY id'
    )->fetchAll();
} catch (Throwable $e) {
    error_log('[dados-jogos.php] ' . $e->getMessage());
    http_response_code(500);
    echo "console.error('Falha ao carregar jogos do servidor.'); const catalogoJogos = []; const catalogoBase = [];";
    exit;
}

$catalogoJogos = [];
$catalogoBase = [];

foreach ($linhas as $j) {
    $catalogoJogos[] = [
        'nome' => $j['nome'],
        'peso' => (float) $j['peso'],
    ];

    // Jogos que só existem para o cálculo de FPS do montador de setup
    // (ex.: "Grand Theft Auto V") não têm ficha completa no catálogo.
    if ($j['categoria'] === null && $j['imagem'] === null) {
        continue;
    }

    $catalogoBase[] = [
        'nome'     => $j['nome'],
        'imagem'   => $j['imagem'],
        'categoria'=> $j['categoria'],
        'estrelas' => $j['estrelas'],
        'nota'     => $j['nota'],
        'tags'     => $j['tags'] !== null ? json_decode($j['tags']) : [],
        'specs'    => $j['specs'] !== null ? json_decode($j['specs']) : new stdClass(),
    ];
}

echo '// Gerado dinamicamente a partir do banco de dados MySQL (tabela jogos)' . PHP_EOL;
echo 'const catalogoJogos = ' . json_encode($catalogoJogos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . ';' . PHP_EOL;
echo 'const catalogoBase = ' . json_encode($catalogoBase, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . ';' . PHP_EOL;
