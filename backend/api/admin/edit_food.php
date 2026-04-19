<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireAdmin();
requireMethod('PUT');

$data = readJsonBody();
$id = (int)($data['id'] ?? 0);
$name = trim($data['name'] ?? '');
$description = trim($data['description'] ?? '');
$price = (float)($data['price'] ?? 0);
$categoryId = (int)($data['category_id'] ?? 0);
$image = trim($data['image'] ?? '');

if ($id <= 0 || $name === '' || $price <= 0 || $categoryId <= 0) {
    respond(['error' => 'id, name, price and category are required'], 400);
}

$stmt = $pdo->prepare('UPDATE foods SET category_id = ?, name = ?, description = ?, price = ?, image = ? WHERE id = ?');
$stmt->execute([$categoryId, $name, $description, $price, $image, $id]);
respond(['success' => true]);
