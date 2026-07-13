<?php
/**
 * Login_Page/php/cadastro.php
 * -----------------------------------------------------------------------
 * Recebe o POST do formulário #formCadastro em Login_Page/login_page.php
 * (<form id="formCadastro" action="php/cadastro.php" method="POST">).
 *
 * *** ATENÇÃO — não corrigido aqui de propósito ***
 * Os campos deste formulário no HTML original NÃO têm atributo `name`
 * (apenas `id`), com exceção de um atributo escrito como `nome="confirmar_senha"`
 * no campo de confirmar senha (que não é reconhecido pelo navegador, pois o
 * atributo correto é `name`, não `nome`). Sem `name`, os navegadores não
 * incluem esses campos no envio do <form>, então hoje este endpoint
 * receberia um POST vazio em um submit tradicional.
 *
 * Como a instrução foi não alterar nada do front-end, este backend já foi
 * escrito esperando os nomes de campo "corretos" (nome, email, senha,
 * confirmar_senha) para o dia em que o formulário ganhar os atributos
 * `name="nome"`, `name="email"`, `name="senha"` e `name="confirmar_senha"`.
 * Também aceita, como fallback, os nomes que aparecem nos ids
 * (emailCadastro, senhaCadastro, confirmarSenha) para o caso de o front-end
 * vir a usar fetch()/FormData com esses nomes.
 * -----------------------------------------------------------------------
 */

declare(strict_types=1);

require __DIR__ . '/../../backend/config/database.php';

header('Content-Type: application/json; charset=utf-8');

const CAMINHO_LOGIN = '../login_page.php';

function campo(string ...$possiveisNomes): string
{
    foreach ($possiveisNomes as $nomeCampo) {
        if (isset($_POST[$nomeCampo]) && $_POST[$nomeCampo] !== '') {
            return trim((string) $_POST[$nomeCampo]);
        }
    }
    return '';
}

function responder_erro(string $mensagem, int $statusHttp = 400): void
{
    http_response_code($statusHttp);

    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        echo json_encode(['ok' => false, 'mensagem' => $mensagem]);
        exit;
    }

    header('Location: ' . CAMINHO_LOGIN . '?erroCadastro=' . rawurlencode($mensagem));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder_erro('Método não permitido.', 405);
}

$nome = campo('nome');
$email = campo('email', 'emailCadastro');
$senha = campo('senha', 'senhaCadastro');
$confirmarSenha = campo('confirmar_senha', 'confirmarSenha');

if (mb_strlen($nome) < 3) {
    responder_erro('Digite seu nome completo.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder_erro('Digite um e-mail válido.');
}

if (mb_strlen($senha) < 6) {
    responder_erro('A senha deve ter no mínimo 6 caracteres.');
}

if ($confirmarSenha !== $senha) {
    responder_erro('As senhas não coincidem.');
}

$email = strtolower($email);

if ($email === 'admin@nexusgg.com') {
    responder_erro('Este e-mail não está disponível.');
}

try {
    $pdo = nexus_db();

    $stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        responder_erro('Já existe uma conta com este e-mail.', 409);
    }

    // Cadastro sempre cria uma conta comum ("user"), nunca admin —
    // mesma regra que existia no auth.js original.
    $insert = $pdo->prepare(
        'INSERT INTO usuarios (nome, email, senha_hash, role) VALUES (:nome, :email, :senha_hash, :role)'
    );
    $insert->execute([
        'nome' => $nome,
        'email' => $email,
        'senha_hash' => password_hash($senha, PASSWORD_DEFAULT),
        'role' => 'user',
    ]);

    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        echo json_encode(['ok' => true]);
        exit;
    }

    // Sem sessão automática aqui: o login continua sendo feito pelo
    // formulário de login, batendo com o comportamento original
    // (registrarUsuario + autenticarUsuario em sequência).
    header('Location: ' . CAMINHO_LOGIN . '?cadastroOk=1');
    exit;
} catch (Throwable $e) {
    error_log('[cadastro.php] ' . $e->getMessage());
    responder_erro('Erro interno ao processar o cadastro.', 500);
}
