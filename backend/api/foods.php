<?php
require_once __DIR__ . '/../config/bootstrap.php';

try {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];

    $scriptDirUrl = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    $uploadsBaseUrl = $scheme . '://' . $host . preg_replace('#/api$#', '', $scriptDirUrl) . '/uploads/';

    if (isset($_GET['id']) && $_GET['id'] !== '') {
        $stmt = $pdo->prepare("
            SELECT f.*, c.name AS category_name
            FROM foods f
            LEFT JOIN categories c ON c.id = f.category_id
            WHERE f.id = ?
        ");
        $stmt->execute([$_GET['id']]);
        $food = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$food) {
            respond(['error' => 'Food not found'], 404);
        }

        $food['image_url'] = !empty($food['image']) ? $uploadsBaseUrl . $food['image'] : null;
        respond($food);
    }

    $sql = "
        SELECT f.*, c.name AS category_name
        FROM foods f
        LEFT JOIN categories c ON c.id = f.category_id
    ";

    if (!empty($_GET['category_id'])) {
        $sql .= " WHERE f.category_id = ? ORDER BY f.id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_GET['category_id']]);
    } else {
        $sql .= " ORDER BY f.id DESC";
        $stmt = $pdo->query($sql);
    }

    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($foods as &$food) {
        $food['image_url'] = !empty($food['image']) ? $uploadsBaseUrl . $food['image'] : null;
    }

    respond($foods);
} catch (Exception $e) {
    respond([
        'error' => 'Failed to load foods',
        'details' => $e->getMessage()
    ], 500);
}