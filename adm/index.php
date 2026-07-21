<?php
require_once "include/header.php";
?>

<div class="row">

    <div class="col-12">

        <h2 class="mb-3">
            Dashboard
        </h2>

        <p class="text-muted">
            Bem-vindo ao Painel Administrativo da NexusGG.
        </p>

        <hr>

    </div>

</div>


<div class="row g-4">

    <div class="col-md-6">

        <div class="card shadow-sm">

            <div class="card-body">

                <h4 class="card-title">

                    <i class="bi bi-people-fill"></i>

                    Usuários

                </h4>

                <p class="card-text">

                    Gerencie os usuários cadastrados.

                </p>

                <a href="usuarios.php" class="btn btn-primary">

                    Acessar

                </a>

            </div>

        </div>

    </div>


    <div class="col-md-6">

        <div class="card shadow-sm">

            <div class="card-body">

                <h4 class="card-title">

                    <i class="bi bi-gear-fill"></i>

                    Configurações

                </h4>

                <p class="card-text">

                    Configure os dados da NexusGG.

                </p>

                <a href="configuracoes.php" class="btn btn-primary">

                    Acessar

                </a>

            </div>

        </div>

    </div>

</div>

<?php
require_once "include/footer.php";
?>