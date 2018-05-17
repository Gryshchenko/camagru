<?php
class getImage {
  private $db_location;
  private $db_name;
  private $db_user;
  private $db_password;
  private $img_array;


  public function __construct($db_location, $db_name, $db_user, $db_password) {
      $this->db_location =$db_location;
      $this->db_name = $db_name;
      $this->db_user =$db_user;
      $this->db_password = $db_password;
      $this->img_array = $this->count_img_array();
  }

  public function get_img_src($page_counter)
  {
    $start = $page_counter * 15;
    $counter = $start + 15;
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_img = $conn->prepare($this->get_id_current_table($start, $counter));
      $find_img->execute();
      $is_img = $this->change_user_id_to_user_name($find_img->fetchAll());
      $is_img = json_encode($is_img);
      echo $is_img;

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  private function get_id_current_table($start, $counter) {
    return ("SELECT `user_id` , `src` FROM `user_img` ORDER BY `img_id` DESC LIMIT $start, $counter");
  }

  private function change_user_id_to_user_name($is_img){
    $counter = sizeof($is_img);
    $i = 0;

    while ($counter > $i)
    {
      try {
        $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $find_user = $conn->prepare($this->get_user_from_table($is_img[$i][0]));
        $find_user->execute();
        $is_user = $find_user->fetchAll();
        $is_img[$i][0] = $is_user[0][0];
      } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
      $i++;
    }
    return ($is_img);
  }

  private function get_user_from_table($username) {
		return ("SELECT `login` FROM `users` WHERE `id`='$username'");
	}

  private function get_id_from_table() {
    return ("SELECT `user_id` , `src` FROM `user_img`");
  }

  public function count_img_array()
  {
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_img = $conn->prepare($this->get_id_from_table());
      $find_img->execute();
      $is_img = $this->change_user_id_to_user_name($find_img->fetchAll());
      return ($is_img);

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  public function count_pagination()
  {
      print_r(ceil(count($this->img_array) / 15));
  }

  public function get_comment_img($id)
  {
    try {
      $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_user = $conn->prepare($this->get_user_byd_id($id));
      $find_user->execute();
      $is_user = $find_user->fetchAll();
      $get_user_name = $conn->prepare($this->get_user_name($is_user[0][0]));
      $get_user_name->execute();
      $is_user_name = $get_user_name->fetchAll();
      $get_img = $conn->prepare($this->get_img($id));
      $get_img->execute();
      $is_img = $get_img->fetchAll();
      $result = array($is_user_name[0][0], $is_img[0][0]);
      return (json_encode($result));

    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  private function get_user_byd_id($id) {
    return ("SELECT `user_id` FROM `user_img` WHERE `img_id`='$id'");
  }

  private function get_user_name($name) {
    return ("SELECT `login` FROM `users` WHERE `id`='$name'");
  }

  private function get_img($img) {
    return ("SELECT `src` FROM `user_img` WHERE `img_id`='$img'");
  }

  public function get_all_current_user($user) {
    $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $find_photos = $conn->prepare("SELECT `src` FROM `user_img` INNER JOIN `users` ON `user_img`.`user_id` = `users`.`id` WHERE `users`.`login`='$user'");
    $find_photos->execute();
    $is_photos = $find_photos->fetchAll();
    echo (json_encode($is_photos));
  }

  public function remove_user_photo($photo_id) {
    $conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $find_photos = $conn->exec("DELETE FROM `user_img` WHERE `img_id`='$photo_id'");
  }
}
?>
