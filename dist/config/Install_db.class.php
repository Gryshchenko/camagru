<?php
class Install_db {
    private $host;
    private $db_Name;
    private $user;
    private $password;


    public function __construct($host, $db_Name, $user, $password) {
        $this->host = $host;
        $this->db_Name = $db_Name;
        $this->user = $user;
        $this->password = $password;
    }

    public function creat_db() {
        try {
            $dataBase = new PDO("mysql:host=$this->host;", $this->user, $this->password);
            $this->is_db_not_exists($dataBase);
            $this->is_db_exist($dataBase);
            $this->is_table_not_exists($dataBase);
            $this->is_table_img_not_exists($dataBase);
            $this->is_table_like_not_exists($dataBase);
            $this->is_table_comments_not_exists($dataBase);
            echo ("Database ready");
        } catch (PDOException $e) {
            printf("Connection to database wasn't established: %s", $e->getMessage());
        }
    }

    private function is_db_not_exists($dataBase) {
        $request = "CREATE DATABASE IF NOT EXISTS `" . $this->db_Name . "`";
          $dataBase->query($request);
    }

    private function is_db_exist($dataBase) {
      $queryStatement = "USE `" . $this->db_Name . "`";
      $dataBase->query($queryStatement);
    }
    private function is_table_not_exists($dataBase) {
      $queryStatement = "CREATE TABLE IF NOT EXISTS `users` (
                          `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                          `login` varchar(32) NOT NULL,
                          `email` varchar(255) NOT NULL,
                          `password` varchar(255) NOT NULL,
                          `verifications` ENUM('true', 'false') DEFAULT 'false' NOT NULL,
                          `comment_mail` ENUM('true', 'false') DEFAULT 'true' NOT NULL,
                          `verifications_code` varchar(255) )";
      $dataBase->query($queryStatement);
    }
    private function is_table_img_not_exists($dataBase) {
      $queryStatement = "CREATE TABLE IF NOT EXISTS `user_img` (
                          `img_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                          `src` varchar(255) NOT NULL,
                          `user_id` varchar(255) NOT NULL)";
      $dataBase->query($queryStatement);
    }

    private function is_table_like_not_exists($dataBase) {
      $queryStatement = "CREATE TABLE IF NOT EXISTS `like` (
                          `img_id` INT NOT NULL,
                          `quantity` INT DEFAULT '0',
                          `user_id` INT NOT NULL)";
      $dataBase->query($queryStatement);
    }

    private function is_table_comments_not_exists($dataBase) {
      $queryStatement = "CREATE TABLE IF NOT EXISTS `comments` (
                          `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                          `img_id` INT NOT NULL,
                          `comments` varchar(255) NOT NULL,
                          `user` varchar(255) NOT NULL,
                          `datetime` datetime DEFAULT CURRENT_TIMESTAMP)";
      $dataBase->query($queryStatement);
  }
}
?>
