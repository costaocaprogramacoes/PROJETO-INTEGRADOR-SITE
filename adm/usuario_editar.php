<?php
// Conexão atualizada
require_once __DIR__ . '/../backend/config/database.php';
$conn = nexus_db();

// Pega o ID da URL
$id = $_GET["id"] ?? 0;

// Busca os dados atuais do usuário
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");
$stmt->execute([$id]);
$usuario = $stmt->fetch();

// Se não achar o usuário, devolve para a lista
if (!$usuario) {
    header("Location: usuarios.php");
    exit;
}
// Processa o formulário de edição
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    // Força o e-mail para minúsculo na hora de salvar
    $email = strtolower(trim($_POST["email"])); 
    $role = $_POST["role"];
    $status = $_POST["status"];

    // Se o campo de senha não estiver vazio, atualiza a senha também
    if (!empty($_POST["senha"])) {
// ... resto do código ...
        $senha_hash = password_hash($_POST["senha"], PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE usuarios SET nome=?, email=?, senha_hash=?, role=?, status=? WHERE id=?");
        $stmt->execute([$nome, $email, $senha_hash, $role, $status, $id]);
    } else {
        // Atualiza apenas os dados gerais (mantém a senha antiga)
        $stmt = $conn->prepare("UPDATE usuarios SET nome=?, email=?, role=?, status=? WHERE id=?");
        $stmt->execute([$nome, $email, $role, $status, $id]);
    }

    header("Location: usuarios.php");
    exit;
}

// Puxa o visual do topo
require_once "include/header.php";
?>

<div class="card shadow-sm">
    <div class="card-header">
        <h3>Editar Usuário</h3>
    </div>
    <div class="card-body">
        <form method="POST">
            <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" name="nome" class="form-control" value="<?= htmlspecialchars($usuario['nome']) ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($usuario['email']) ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Nova Senha (deixe em branco para não alterar)</label>
                <input type="password" name="senha" class="form-control">
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <label class="form-label">Nível</label>
                    <select name="role" class="form-select">
                        <option value="user" <?= $usuario['role'] == 'user' ? 'selected' : '' ?>>Cliente</option>
                        <option value="admin" <?= $usuario['role'] == 'admin' ? 'selected' : '' ?>>Administrador</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Status</label>
                    <select name="status" class="form-select">
                        <option value="ativo" <?= ($usuario['status'] ?? 'ativo') == 'ativo' ? 'selected' : '' ?>>Ativo</option>
                        <option value="bloqueado" <?= ($usuario['status'] ?? 'ativo') == 'bloqueado' ? 'selected' : '' ?>>Bloqueado</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-warning">
                <i class="bi bi-pencil-square"></i> Salvar Alterações
            </button>
            <a href="usuarios.php" class="btn btn-secondary">Voltar</a>
        </form>
    </div>
</div>

<?php require_once "include/footer.php"; ?>