<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireMethod('POST');

$data = readJsonBody();
$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['address'] ?? '');
$eventDate = trim($data['event_date'] ?? '');
$eventType = trim($data['event_type'] ?? 'Wedding');
$items = $data['items'] ?? [];
$total = (float)($data['total'] ?? 0);

if ($name === '' || $phone === '' || $address === '' || $eventDate === '' || empty($items)) {
    respond(['error' => 'Missing required fields'], 400);
}

try {
    $pdo->beginTransaction();
    $userId = $_SESSION['user_id'] ?? null;
    $stmt = $pdo->prepare('INSERT INTO orders (user_id, customer_name, phone, address, event_date, event_type, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, "pending")');
    $stmt->execute([$userId, $name, $phone, $address, $eventDate, $eventType, $total]);
    $orderId = $pdo->lastInsertId();

    $itemStmt = $pdo->prepare('INSERT INTO order_items (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)');
    foreach ($items as $item) {
        $itemStmt->execute([$orderId, $item['id'], $item['quantity'], $item['price']]);
    }

    $_SESSION['cart'] = [];
    $pdo->commit();
    respond(['success' => true, 'order_id' => (int)$orderId]);
} catch (Exception $e) {
    $pdo->rollBack();
    respond(['error' => 'Failed to create order', 'details' => $e->getMessage()], 500);
}
