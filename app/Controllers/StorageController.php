<?php 

namespace app\Controllers;
use app\Config\DB;
use app\Models\Product;

class StorageController extends FrontendController {
    
    public function show_all_products() {
        try {
            $product_model = new Product(DB::instance());
            $products = $product_model->getAll();
            $this->json($products);
        }
        catch(\PDOException $ex) {

            $this->json($ex->getMessage(), 500);
        }
    }
    public function get_checked_left() {
        if(isset($_POST['send'])) {
            try {

                $ids = $_POST['ids'];

                $product_model = new Product(DB::instance());
                $products = $product_model->get_checked_left($ids);
                $this->json($products);
            }
            catch(\PDOException $ex) {
    
                $this->json($ex->getMessage(), 500);
            }
        }
        else {
            $this->json(null, 403);
        }
        
    }

    public function get_unchecked_left() {
        if(isset($_POST['send'])) {
            try {
                $ids = $_POST['ids'];
                $product_model = new Product(DB::instance());
                $products = $product_model->get_unchecked_left($ids);
                $this->json($products);
            }
            catch(\PDOException $ex) {
    
                $this->json($ex->getMessage(), 500);
            }
        }
        else {
            $this->json(null, 403);
        }
    }

    public function obrada() {
        if(isset($_POST['send'])) {
            try {

                $ids = $_POST['ids'];

                $product_model = new Product(DB::instance());
                $products = $product_model->get_checked_left($ids);
                $this->json($products);
            }
            catch(\PDOException $ex) {
    
                $this->json($ex->getMessage(), 500);
            }
        }
        else {
            $this->json(null, 403);
        }
    }
    
}