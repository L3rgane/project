<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireMethod('POST');

$data = readJsonBody();
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if ($name === '' || $email === '' || $password === '') {
    respond(['error' => 'All fields are required'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(['error' => 'Invalid email'], 400);
}
if (strlen($password) < 6) {
    respond(['error' => 'Password must be at least 6 characters'], 400);
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    respond(['error' => 'Email already exists'], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "customer")');
$stmt->execute([$name, $email, $hash]);
$id = $pdo->lastInsertId();

$_SESSION['user_id'] = (int)$id;
$_SESSION['user_name'] = $name;
$_SESSION['user_email'] = $email;
$_SESSION['user_role'] = 'customer';

respond([
    'success' => true,
    'message' => 'Registration successful',
    'user' => [
        'id' => (int)$id,
        'name' => $name,
        'email' => $email,
        'role' => 'customer'
    ]
], 201);
