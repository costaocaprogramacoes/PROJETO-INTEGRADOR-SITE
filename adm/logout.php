<?php
session_start();

$_SESSION = [];

session_unset();

session_destroy();

header("Location: ../Login_Page/login_page.php");
exit;
?>