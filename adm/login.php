<?php
session_start();

// Puxe o seu arquivo de conexão com o banco
require_once __DIR__ . '/../backend/config/database.php';

// Se o admin já estiver logado, manda direto para o painel (index.php)
if (isset($_SESSION['admin_logado']) && $_SESSION['admin_logado'] === true) {
    header("Location: index.php");
    exit;
}

$erro = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];

    try {
        $pdo = nexus_db(); // Usando a sua função padrão de conexão

        // Busca o usuário apenas se ele for um 'admin'
        $stmt = $pdo->prepare("SELECT id, nome, email, senha_hash, role FROM usuarios WHERE email = :email AND role = 'admin'");
        $stmt->execute(['email' => strtolower($email)]);
        $usuario = $stmt->fetch();

        // Verifica se encontrou o admin e se a senha está correta
        if ($usuario && password_verify($senha, $usuario['senha_hash'])) {
            
            // 1. Cria as sessões que o painel (auth_check) precisa
            $_SESSION['admin_logado'] = true;
            $_SESSION['admin_nome'] = $usuario['nome'];
            
            // 2. Cria a sessão que as APIs do backend provavelmente exigem!
            $_SESSION['usuario'] = [
                'id' => $usuario['id'],
                'nome' => $usuario['nome'],
                'email' => $usuario['email'],
                'role' => $usuario['role'],
            ];
            
            header("Location: index.php");
            exit;
        } else {
            $erro = "E-mail ou senha incorretos, ou acesso negado.";
        }
    } catch (Throwable $e) {
        $erro = "Erro de conexão com o banco de dados.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login - Painel Admin</title>
</head>
<body>
    <div style="max-width: 400px; margin: 50px auto; font-family: sans-serif;">
        <h2>Login Administrativo</h2>
        
        <?php if (!empty($erro)): ?>
            <p style="color: red; font-weight: bold;"><?= $erro ?></p>
        <?php endif; ?>
        
        <form method="POST" action="login.php">
            <div style="margin-bottom: 15px;">
                <label>E-mail:</label><br>
                <input type="email" name="email" required style="width: 100%; padding: 8px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Senha:</label><br>
                <input type="password" name="senha" required style="width: 100%; padding: 8px;">
            </div>
            <button type="submit" style="padding: 10px 20px;">Entrar no Painel</button>
        </form>
    </div>
</body>
</html>