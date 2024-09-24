<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $imageData = $_FILES['image'];
    $editing = isset($_POST['editing']) ? filter_var($_POST['editing'], FILTER_VALIDATE_BOOLEAN) : false;

    $filePath = addImage($imageData, $id,$editing);

    if ($filePath) {
        echo json_encode(['message' => 'Imagem enviada com sucesso', 'filePath' => $filePath]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao receber imagem']);
    }
}
function addImage($imageData, $id, $editing)
{
    $directory = __DIR__ . "/questionImages/";

    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }

    if ($editing) {
        $filePath = $directory . $id . ".png";
    } else {
        $counter = 1;

        do {
            $filePath = $directory . $id . "_" . $counter . ".png";
            $counter++;
        } while (file_exists($filePath));
    }
    if (move_uploaded_file($imageData['tmp_name'], $filePath)) {
        return $filePath;
    } else {
        return false;
    }
}
?>


