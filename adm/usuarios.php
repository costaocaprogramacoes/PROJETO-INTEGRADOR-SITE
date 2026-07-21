<?php
// 1. Puxa o seu arquivo de banco de dados principal
require_once __DIR__ . '/../backend/config/database.php';

// 2. Cria a variável $conn usando a função que já funciona
$conn = nexus_db();

require_once "include/header.php";

// 3. Faz a busca no banco normalmente
$resultado = $conn->query("SELECT * FROM usuarios ORDER BY id DESC");
?>

<div class="d-flex justify-content-between align-items-center mb-4">

    <h2>Usuários</h2>

    <a href="usuario_add.php" class="btn btn-success">

        <i class="bi bi-person-plus-fill"></i>

        Novo Usuário

    </a>

</div>

<div class="card shadow-sm">

    <div class="card-body">

        <div class="table-responsive">

        <table class="table table-hover align-middle">

            <thead class="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Nível</th>
                    <th>Status</th>
                    <th width="220">Ações</th>

                </tr>

            </thead>

            <tbody>

            <?php while($u = $resultado->fetch()) { ?>

                <tr>

                    <td><?= $u["id"] ?></td>

                    <td><?= htmlspecialchars($u["nome"]) ?></td>

                    <td><?= htmlspecialchars($u["email"]) ?></td>

                    <td><?= ucfirst($u["role"]) ?></td>

                    <td>

                        <?php if($u["status"]=="ativo"){ ?>

                            <span class="badge bg-success">

                                Ativo

                            </span>

                        <?php } else { ?>

                            <span class="badge bg-danger">

                                Bloqueado

                            </span>

                        <?php } ?>

                    </td>

                    <td>
                        <div class="action-container">
                        <a href="usuario_editar.php?id=<?= $u["id"] ?>" class="btn btn-warning btn-sm">
                            Editar
                        </a>
                        <a href="usuario_status.php?id=<?= $u["id"] ?>" class="btn btn-primary btn-sm">
                            Status
                        </a>
                        <a href="usuario_excluir.php?id=<?= $u["id"] ?>" class="btn btn-danger btn-sm">
                            Excluir
                        </a>
                        </div>
                    </td>

                </tr>

            <?php } ?>

            </tbody>

        </table>

        </div>

    </div>

</div>

<?php require_once "include/footer.php"; ?>