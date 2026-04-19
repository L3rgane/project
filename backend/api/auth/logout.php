<?php
require_once __DIR__ . '/../../config/bootstrap.php';
requireMethod('POST');

if (session_status() === PHP_SESSION_ACTIVE) {
    session_unset();
    session_destroy();
}
respond(['success' => true, 'message' => 'Logged out']);
