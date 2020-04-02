<?php
namespace app\Controllers;
use app\Config\DB;

class Controller {
    protected function loadView($view, $data = null) {
        require_once "app/Views/fixed/head.php";
        require_once "app/Views/fixed/nav.php";
        require_once 'app/Views/pages/' . $view . ".php";
        require_once 'app/Views/fixed/footer.php';
    }

    protected function redirect($page) {
        header("Location: " . $page);
    }

    protected function json($data = null, $statusCode = 200) {
        header("Content-type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }
}

