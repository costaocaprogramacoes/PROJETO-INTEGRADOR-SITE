<?php
/**
 * database.php
 * -----------------------------------------------------------------------
 * Conexão central com o banco de dados usado pelo backend do NexusGG.
 *
 * Usa SQLite (arquivo local, sem precisar de servidor MySQL configurado)
 * para manter o setup simples. Se o site já tiver um banco MySQL/MariaDB
 * próprio, basta trocar o DSN abaixo por algo como:
 *   "mysql:host=localhost;dbname=nexusgg;charset=utf8mb4"
 * e ajustar usuário/senha na chamada do PDO.
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

    $dbPath = __DIR__ . '/../data/nexusgg.sqlite';

    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Garante que a tabela de usuários existe (idempotente).
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )"
    );

    // Semeia a conta de administrador fixa que já existia na demo em
    // localStorage (auth.js), para manter o mesmo login funcionando
    // agora que existe um backend de verdade.
    $stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email');
    $stmt->execute(['email' => 'admin@nexusgg.com']);
    if (!$stmt->fetch()) {
        $insert = $pdo->prepare(
            'INSERT INTO usuarios (nome, email, senha_hash, role) VALUES (:nome, :email, :senha_hash, :role)'
        );
        $insert->execute([
            'nome' => 'Administrador',
            'email' => 'admin@nexusgg.com',
            'senha_hash' => password_hash('nexusgg@admin', PASSWORD_DEFAULT),
            'role' => 'admin',
        ]);
    }

    return $pdo;
}
