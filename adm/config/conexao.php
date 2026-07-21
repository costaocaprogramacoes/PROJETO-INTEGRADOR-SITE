<?php
// Define o caminho correto para o novo arquivo de banco de dados do nexusgg
$caminho_banco = __DIR__ . '/../../backend/config/database.php';

// Verifica se o novo arquivo existe e o inclui
if (file_exists($caminho_banco)) {
    require_once $caminho_banco;
} else {
    die("Erro Crítico: O arquivo de banco de dados não foi encontrado em: " . $caminho_banco);
}

// Inicia a conexão chamando a função específica do seu novo sistema
try {
    $pdo = nexus_db();
} catch (Exception $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>