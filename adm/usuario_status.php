<?php
// Conexão nova do InfinityFree
require_once __DIR__ . '/../backend/config/database.php';
$conn = nexus_db();

$id = $_GET['id'] ?? 0;

if ($id > 0) {
    // Busca o status atual do usuário
    $stmt = $conn->prepare("SELECT status FROM usuarios WHERE id = ?");
    $stmt->execute([$id]);
    $usuario = $stmt->fetch();

    if ($usuario) {
        // Se for ativo, vira bloqueado. Se for bloqueado, vira ativo.
        $novo_status = ($usuario['status'] == 'ativo') ? 'bloqueado' : 'ativo';
        
        // Atualiza no banco
        $update = $conn->prepare("UPDATE usuarios SET status = ? WHERE id = ?");
        $update->execute([$novo_status, $id]);
    }
}

// Redireciona de volta para a lista de usuários
header("Location: usuarios.php");
exit;