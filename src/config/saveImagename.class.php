<?php
class saveImagename {
  private $db_location;
  private $db_name;
  private $db_user;
  private $db_password;
  private $user_name;


  public function __construct($db_location, $db_name, $db_user, $db_password, $user_name) {
      $this->db_location =$db_location;
      $this->db_name = $db_name;
      $this->db_user =$db_user;
      $this->db_password = $db_password;
      $this->user_name = $user_name;
  }

  public function put_filename_database($img)
  {
    $file_name = $this->creat_photo_file($img);
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $conn->exec($this->set_file_in_table($file_name, $this->get_user_id()));
      echo 'Photo successful saved';

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  private function creat_photo_file($img)
  {
    $today = date("YmdHis");
    $file_name = $this->get_free_img_id() . '.' . 'png';
    $url = preg_replace('/^data:image\/\w+;base64,/i', '', $img);
    $url = str_replace(' ', '+', $url);
    $decode_url = base64_decode($url);
    file_put_contents('../photos/'. $file_name, $decode_url);
    return ($file_name);
  }

  private function get_free_img_id() {
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_user = $conn->prepare($this->get_img_id_from_table());
      $find_user->execute();
      $is_user = $find_user->fetchAll();
      $result = end($is_user);
      return (intval($result[0]) + 1);

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  private function get_user_id() {
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_user = $conn->prepare($this->get_id_from_table());
      $find_user->execute();
      $is_user = $find_user->fetchAll();
      return ($is_user[0][0]);

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  private function get_img_id_from_table() {
    return ("SELECT `img_id` FROM `user_img`");
  }

  private function get_id_from_table() {
		return ("SELECT `id` FROM `users` WHERE `login`='$this->user_name'");
	}

  private function set_file_in_table($file_name, $user_name) {
    return ("INSERT INTO user_img (src, user_id) VALUES ('$file_name', '$user_name')");
  }

}
?>
