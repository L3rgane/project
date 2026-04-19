<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireMethod('POST');

$data = readJsonBody();
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    respond(['error' => 'Email and password are required'], 400);
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    respond(['error' => 'Invalid email or password'], 401);
}

$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['user_role'] = $user['role'];

respond([
    'success' => true,
    'user' => [
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
]);
