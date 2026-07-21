<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Se a sessão de admin não existir, manda de volta para a tela de login do painel
if (!isset($_SESSION['admin_logado']) || $_SESSION['admin_logado'] !== true) {
    header("Location: login.php");
    exit;
}
?>