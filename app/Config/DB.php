<?php
namespace app\Config;

class DB  {
    private $conn;
    private static $db;

    private function __construct() {
        $this->connect();
    }

    public function instance() {
        if(self::$db === null) {
            self::$db = new DB();
        }
        return self::$db;
    }

    private function connect(){
        $this->conn = new \PDO("mysql:host=".SERVER.";dbname=".DBNAME.";charset=utf8", USERNAME, PASSWORD);
        $this->conn->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
        $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    public function executeQuery(string $query){
        return $this->conn->query($query)->fetchAll();
    }

    public function executeOneRow(string $query, Array $params){
        $prepare = $this->conn->prepare($query);
        $prepare->execute($params);
        return $prepare->fetch();
    }
    public function executeAll(string $query, Array $params) {
        $prepare = $this->conn->prepare($query);
        $prepare->execute($params);
        return $prepare->fetchAll();
    }
    public function insert_fja(string $query, Array $params) {
        $prepare = $this->conn->prepare($query);
        $prepare->execute($params);
    }
}