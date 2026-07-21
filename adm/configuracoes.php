<?php
// Usando a conexão nova que funciona no InfinityFree
require_once __DIR__ . '/../backend/config/database.php';
$conn = nexus_db();

require_once "include/header.php";

$config = $conn->query("SELECT * FROM configuracoes LIMIT 1")->fetch();

if (isset($_POST["salvar"])) {

    $nome = trim($_POST["nome_loja"]);
    $email = trim($_POST["email"]);
    $whatsapp = trim($_POST["whatsapp"]);
    $endereco = trim($_POST["endereco"]);
    $rodape = trim($_POST["rodape"]);

    $conn->prepare("
        UPDATE configuracoes SET
        nome_loja = :nome_loja,
        email = :email,
        whatsapp = :whatsapp,
        endereco = :endereco,
        rodape = :rodape
        WHERE id = :id
    ")->execute([
        'nome_loja' => $nome,
        'email' => $email,
        'whatsapp' => $whatsapp,
        'endereco' => $endereco,
        'rodape' => $rodape,
        'id' => $config['id'],
    ]);

    header("Location: configuracoes.php");
    exit;
}
?>

<div class="card shadow-sm">
    <div class="card-header">
        <h3>Configurações da Loja</h3>
    </div>
    <div class="card-body">
        <form method="POST">
            <div class="mb-3">
                <label class="form-label">Nome da Loja</label>
                <input
                    type="text"
                    class="form-control"
                    name="nome_loja"
                    value="<?= htmlspecialchars($config["nome_loja"] ?? '') ?>"
                    required>
            </div>
            <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    value="<?= htmlspecialchars($config["email"] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label">WhatsApp</label>
                <input
                    type="text"
                    class="form-control"
                    name="whatsapp"
                    value="<?= htmlspecialchars($config["whatsapp"] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label">Endereço</label>
                <input
                    type="text"
                    class="form-control"
                    name="endereco"
                    value="<?= htmlspecialchars($config["endereco"] ?? '') ?>">
            </div>
            <div class="mb-4">
                <label class="form-label">Rodapé</label>
                <input
                    type="text"
                    class="form-control"
                    name="rodape"
                    value="<?= htmlspecialchars($config["rodape"] ?? '') ?>">
            </div>
            <button class="btn btn-primary" name="salvar">
                Salvar Alterações
            </button>
        </form>
    </div>
</div>

<?php require_once "include/footer.php"; ?>