<?php
// Conexão nova do InfinityFree
require_once __DIR__ . '/../backend/config/database.php';
$conn = nexus_db();

$id = $_GET['id'] ?? 0;

if ($id > 0) {
    // Deleta o usuário do banco
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->execute([$id]);
}

// Redireciona de volta para a lista de usuários
header("Location: usuarios.php");
exit;