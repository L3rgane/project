<?php
function handleCors() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost',
        'http://127.0.0.1',
    ];

    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header('Access-Control-Allow-Origin: http://localhost:3000');
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
