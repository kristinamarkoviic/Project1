<?php
namespace app\Models;
use app\Config\DB;

class Product {

    private $db;

    public function __construct(DB $db) {
        $this->db = $db;
    }
    
    public function getAll() {
        return $this->db->executeQuery("SELECT * FROM products ORDER BY product_name ");
    }
    public function get_checked_left($idProducts) {
        if(isset($idProducts)) {
            $queryParams = [];
            $values = [];

        foreach($idProducts as $idProd){
            $queryParams[] = "?";

            $values[] = $idProd;
        }

        $query = "SELECT * FROM products WHERE idProduct IN (". implode(',', $queryParams) .") ORDER BY product_name";

        return $this->db->executeAll($query, $values);
        }
        else {
            return $this->db->executeQuery("SELECT * FROM products ORDER BY product_name ");
        }
        
    
    }

    
    public function get_unchecked_left($idProducts) {
        $queryParams = [];
        $values = [];

        foreach($idProducts as $idProd){
            $queryParams[] = "?";

            $values[] = $idProd;
        }

        $query = "SELECT * FROM products WHERE idProduct NOT IN (". implode(',', $queryParams) .") ORDER BY product_name";

        return $this->db->executeAll($query, $values);
    
    }
}