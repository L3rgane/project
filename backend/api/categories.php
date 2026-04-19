<?php
require_once __DIR__ . '/../config/bootstrap.php';

try {
    $stmt = $pdo->query('SELECT id, name FROM categories ORDER BY name ASC');
    respond($stmt->fetchAll());
} catch (Exception $e) {
    respond(['error' => 'Failed to load categories', 'details' => $e->getMessage()], 500);
}
