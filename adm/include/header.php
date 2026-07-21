<?php

require_once __DIR__ . "/auth_check.php";

$_SESSION_ADMIN = $_SESSION["usuario"];

?>

<!DOCTYPE html>

<html lang="pt-BR" data-bs-theme="dark">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>NexusGG - Painel Administrativo</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

<link rel="stylesheet" href="assets/css/admin.css">

</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

<div class="container-fluid">

<a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.php">

<img src="../Main_Page/img_main/logo.png" alt="NexusGG" style="height: 28px; width: auto;">
NexusGG Admin

</a>

<button
class="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#menu">

<span class="navbar-toggler-icon"></span>

</button>

<div class="collapse navbar-collapse" id="menu">

<ul class="navbar-nav ms-auto">

<li class="nav-item">

<span class="nav-link text-muted">

Olá, <?= htmlspecialchars($_SESSION_ADMIN['nome']) ?>

</span>

</li>

<li class="nav-item">

<a class="nav-link" href="../Main_Page/main.html" target="_blank" rel="noopener">

<i class="bi bi-box-arrow-up-right"></i> Ver Site

</a>

</li>

<li class="nav-item">

<a class="nav-link" href="index.php">

Dashboard

</a>

</li>

<li class="nav-item">

<a class="nav-link" href="usuarios.php">

Usuários

</a>

</li>

<li class="nav-item">

<a class="nav-link" href="configuracoes.php">

Configurações

</a>

</li>

<li class="nav-item">

<a class="nav-link text-danger" href="logout.php">

Sair

</a>

</li>

</ul>

</div>

</div>

</nav>

<div class="container mt-4">