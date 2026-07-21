<?php
// Conexão atualizada
require_once __DIR__ . '/../backend/config/database.php';
$conn = nexus_db();

// Processa o envio do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    // Força o e-mail para minúsculo na hora de salvar
    $email = strtolower(trim($_POST["email"])); 
    $senha = password_hash($_POST["senha"], PASSWORD_DEFAULT);
    $role = $_POST["role"];

    // Insere no banco já com o status ativo
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha_hash, role, status) VALUES (?, ?, ?, ?, 'ativo')");
    $stmt->execute([$nome, $email, $senha, $role]);

    header("Location: usuarios.php");
    exit;
}

// Puxa o visual do topo (Dark Theme, CSS, etc)
require_once "include/header.php";
?>

<div class="card shadow-sm">
    <div class="card-header">
        <h3>Novo Usuário</h3>
    </div>
    <div class="card-body">
        <form method="POST">
            <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" name="nome" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input type="email" name="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" name="senha" class="form-control" required>
            </div>
            <div class="mb-4">
                <label class="form-label">Nível</label>
                <select name="role" class="form-select">
                    <option value="user">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="bi bi-check-lg"></i> Salvar
            </button>
            <a href="usuarios.php" class="btn btn-secondary">Voltar</a>
        </form>
    </div>
</div>

<?php require_once "include/footer.php"; ?>