<?php
/**
 * backend/auth/login.php
 * -----------------------------------------------------------------------
 * Recebe o POST do formulário #formLogin em Login_Page/login_page.php
 * (<form id="formLogin" action="../backend/auth/login.php" method="POST">).
 *
 * Campos enviados pelo formulário (via atributo name="..."):
 *   - email  -> input#emailLogin
 *   - senha  -> input#senha
 *
 * Fluxo:
 *   1. Valida os campos recebidos.
 *   2. Procura o usuário pelo e-mail no banco.
 *   3. Confere a senha com password_verify().
 *   4. Em caso de sucesso, cria a sessão PHP e redireciona para a Main_Page.
 *   5. Em caso de erro, redireciona de volta ao login com uma mensagem
 *      de erro na query string, que o front-end pode exibir se desejar.
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

require __DIR__ . '/../config/database.php';

session_start();

header('Content-Type: application/json; charset=utf-8');

// Caminho de volta para as páginas do site, relativo a backend/auth/.
const CAMINHO_LOGIN = '../../Login_Page/login_page.php';
const CAMINHO_MAIN = '../../Main_Page/main.html';

function responder_erro(string $mensagem, int $statusHttp = 400): void
{
    http_response_code($statusHttp);

    // Se o cliente pediu JSON explicitamente (ex: fetch/AJAX no futuro),
    // devolve JSON. Caso contrário (submit tradicional de <form>),
    // redireciona de volta para o login com a mensagem na query string.
    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        echo json_encode(['ok' => false, 'mensagem' => $mensagem]);
        exit;
    }

    header('Location: ' . CAMINHO_LOGIN . '?erro=' . rawurlencode($mensagem));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder_erro('Método não permitido.', 405);
}

$email = trim((string) ($_POST['email'] ?? ''));
$senha = (string) ($_POST['senha'] ?? '');

if ($email === '' || $senha === '') {
    responder_erro('Informe e-mail e senha.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder_erro('E-mail inválido.');
}

try {
    $pdo = nexus_db();

    $stmt = $pdo->prepare('SELECT id, nome, email, senha_hash, role FROM usuarios WHERE email = :email');
    $stmt->execute(['email' => strtolower($email)]);
    $usuario = $stmt->fetch();

    if (!$usuario || !password_verify($senha, $usuario['senha_hash'])) {
        responder_erro('E-mail ou senha incorretos.', 401);
    }

    // Sessão do lado do servidor (substitui o localStorage usado na demo).
    $_SESSION['usuario'] = [
        'id' => $usuario['id'],
        'nome' => $usuario['nome'],
        'email' => $usuario['email'],
        'role' => $usuario['role'],
    ];

    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        echo json_encode(['ok' => true, 'usuario' => $_SESSION['usuario']]);
        exit;
    }

    header('Location: ' . CAMINHO_MAIN);
    exit;
} catch (Throwable $e) {
    error_log('[login.php] ' . $e->getMessage());
    responder_erro('Erro interno ao processar o login.', 500);
}
