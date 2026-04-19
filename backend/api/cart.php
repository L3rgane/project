<?php
require_once __DIR__ . '/../config/bootstrap.php';

if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$method = $_SERVER['REQUEST_METHOD'];
$data = readJsonBody();

if ($method === 'GET') {
    $items = [];
    foreach ($_SESSION['cart'] as $foodId => $quantity) {
        $stmt = $pdo->prepare('SELECT id, name, price, image FROM foods WHERE id = ?');
        $stmt->execute([$foodId]);
        $food = $stmt->fetch();
        if ($food) {
            $food['quantity'] = (int)$quantity;
            $food['subtotal'] = (int)$quantity * (float)$food['price'];
            $food['image_url'] = !empty($food['image']) ? uploadsBaseUrl() . $food['image'] : uploadsBaseUrl() . 'default-menu.jpg';
            $items[] = $food;
        }
    }
    respond($items);
}

if ($method === 'POST') {
    $foodId = (int)($data['food_id'] ?? 0);
    $quantity = max(1, (int)($data['quantity'] ?? 1));
    if ($foodId <= 0) {
        respond(['error' => 'food_id is required'], 400);
    }
    $_SESSION['cart'][$foodId] = ((int)($_SESSION['cart'][$foodId] ?? 0)) + $quantity;
    respond(['success' => true, 'message' => 'Added to cart']);
}

if ($method === 'PUT') {
    $foodId = (int)($data['food_id'] ?? 0);
    $quantity = (int)($data['quantity'] ?? 1);
    if ($foodId <= 0) {
        respond(['error' => 'food_id is required'], 400);
    }
    if ($quantity <= 0) {
        unset($_SESSION['cart'][$foodId]);
    } else {
        $_SESSION['cart'][$foodId] = $quantity;
    }
    respond(['success' => true, 'message' => 'Cart updated']);
}

if ($method === 'DELETE') {
    $foodId = (int)($_GET['food_id'] ?? 0);
    if ($foodId > 0) {
        unset($_SESSION['cart'][$foodId]);
    } else {
        $_SESSION['cart'] = [];
    }
    respond(['success' => true, 'message' => 'Cart cleared']);
}

respond(['error' => 'Method not allowed'], 405);
