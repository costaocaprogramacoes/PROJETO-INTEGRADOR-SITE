<?php
/**
 * backend/config/database.php
 * -----------------------------------------------------------------------
 * Conexão central com o banco de dados relacional do NexusGG.
 *
 * *** ATUALIZAÇÃO ***
 * Esta versão substitui o SQLite usado na fase de protótipo por uma
 * conexão real com MySQL/MariaDB, atendendo ao RF07 do Projeto Integrador
 * (persistência em banco relacional MySQL, gerenciável via phpMyAdmin).
 *
 * As credenciais podem ser sobrescritas por variáveis de ambiente
 * (NEXUS_DB_HOST, NEXUS_DB_NAME, NEXUS_DB_USER, NEXUS_DB_PASS), o que
 * facilita usar valores diferentes em desenvolvimento/produção sem
 * alterar este arquivo.
 *
 * Este arquivo é incluído por todos os scripts em backend/*.
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

function nexus_db(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $host = getenv('NEXUS_DB_HOST') ?: 'sql111.infinityfree.com';
    $port = getenv('NEXUS_DB_PORT') ?: '3306';
    $nome = getenv('NEXUS_DB_NAME') ?: 'if0_42357786_nexusgg';
    $user = getenv('NEXUS_DB_USER') ?: 'if0_42357786';
    $pass = getenv('NEXUS_DB_PASS') ?: 'M7cVTJnXz4Kecm9';

    $dsn = "mysql:host={$host};port={$port};dbname={$nome};charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // Garante que a conta de administrador fixa exista, com o hash
    // gerado de verdade (mantém compatibilidade com o login histórico
    // admin@nexusgg.com / nexusgg@admin já usado em auth.js e login.php).
    $stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email');
    $stmt->execute(['email' => 'admin@nexusgg.com']);
    if (!$stmt->fetch()) {
        $insert = $pdo->prepare(
            'INSERT INTO usuarios (nome, email, senha_hash, role) VALUES (:nome, :email, :senha_hash, :role)'
        );
        $insert->execute([
            'nome'       => 'Administrador',
            'email'      => 'admin@nexusgg.com',
            'senha_hash' => password_hash('nexusgg@admin', PASSWORD_DEFAULT),
            'role'       => 'admin',
        ]);
    }

    return $pdo;
}
