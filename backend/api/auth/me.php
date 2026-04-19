<?php
require_once __DIR__ . '/../../config/bootstrap.php';
if (!isset($_SESSION['user_id'])) {
    respond(['user' => null]);
}
respond(['user' => [
    'id' => (int)$_SESSION['user_id'],
    'name' => $_SESSION['user_name'] ?? '',
    'email' => $_SESSION['user_email'] ?? '',
    'role' => $_SESSION['user_role'] ?? 'customer'
]]);
