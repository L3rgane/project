<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireAdmin();
requireMethod('POST');

$data = readJsonBody();
$name = trim($data['name'] ?? '');
$description = trim($data['description'] ?? '');
$price = (float)($data['price'] ?? 0);
$categoryId = (int)($data['category_id'] ?? 0);
$image = trim($data['image'] ?? '');

if ($name === '' || $price <= 0 || $categoryId <= 0) {
    respond(['error' => 'name, price and category are required'], 400);
}

$stmt = $pdo->prepare('INSERT INTO foods (category_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([$categoryId, $name, $description, $price, $image]);
respond(['success' => true, 'id' => (int)$pdo->lastInsertId()], 201);
