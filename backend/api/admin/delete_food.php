<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireAdmin();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    respond(['error' => 'Method not allowed'], 405);
}

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) {
    respond(['error' => 'id is required'], 400);
}
$stmt = $pdo->prepare('DELETE FROM foods WHERE id = ?');
$stmt->execute([$id]);
respond(['success' => true]);
