<?php
require_once __DIR__ . '/cors.php';
handleCors();

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

require_once __DIR__ . '/database.php';

function readJsonBody() {
    $raw = file_get_contents('php://input');
    $data = $raw ? json_decode($raw, true) : [];
    return is_array($data) ? $data : [];
}

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function requireMethod($method) {
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        respond(['error' => 'Method not allowed'], 405);
    }
}

function requireAdmin() {
    if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
        respond(['error' => 'Admin privileges required'], 403);
    }
}

function uploadsBaseUrl() {
    return 'http://localhost/catering-project/backend/uploads/';
}
