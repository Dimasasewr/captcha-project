<?php
header('Content-Type: application/json');

$valid_keys = ["12345", "ABCDE", "MYSECRET"]; // Daftar kode unik valid

$key = isset($_GET['key']) ? $_GET['key'] : '';

if (in_array($key, $valid_keys)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
