<?php
namespace app\Controllers;
use app\Config\DB;
use app\Models\Product;

class FrontendController extends Controller {
    
    public function __construct() {

    }
    //funkcija za prikaz pocetne stranice 
    
    public function index() {
        $this->loadView("home");
    }
}