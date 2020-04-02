<?php 

require_once "app/Config/autoload.php";
require "app/Config/config.php";


use app\Config\DB;
use app\Controllers\FrontendController;
use app\Controllers\StorageController;

$page = new FrontendController();
$storage = new StorageController();

if(isset($_GET['page'])){
    switch($_GET['page']) {
        case "home":
            $page->index();
        break;
        case "all_products":
            $storage->show_all_products();
        break;
        case "get_left_checked_products":
            $storage->get_checked_left();
        break;
        case "get_rest_left_checked_products":
            $storage->get_unchecked_left();
        break;
        case "obrada_php":
            $storage->obrada();
        break;
    }
} else {
    $page->index();
}