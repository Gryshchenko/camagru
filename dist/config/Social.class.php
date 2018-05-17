<?php
class social {
  private $user;
  private $img_id;
  private $conn;

  public function __construct($user, $img_id, $db_location, $db_name, $db_user, $db_password) {
    $this->user = $user;
    $this->img_id = $img_id;

    try {
      $conn = new PDO("mysql:host=$db_location;dbname=$db_name", $db_user, $db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->conn = $conn;
    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  public function get_all_like() {
    $get_like = $this->conn->prepare($this->count_for_this_img());
    $get_like->execute();
    $count_like = $get_like->fetchAll();
    print_r($count_like[0][0]);
  }

  private function get_all_like_from_table() {
    return ("SELECT `img_id` , `quantity` FROM `like`");
  }

  private function count_for_this_img() {
    return ("SELECT COUNT(`img_id`) FROM `like` WHERE `img_id`='$this->img_id'");
  }

  public function set_like()
  {
      $this->get_user_id();
      $is_user_set_like_before = $this->conn->prepare($this->is_user_set_like());
      $is_user_set_like_before->execute();
      $value = $is_user_set_like_before->fetchAll();
      if (isset($value[0][0])) {
        $this->conn->exec($this->remove_like_in_table());
        $get_like = $this->conn->prepare($this->count_for_this_img());
        $get_like->execute();
        $count_like = $get_like->fetchAll();
        print_r($count_like[0][0]);
      }
      else {
        $this->conn->exec($this->set_like_in_table());
        $get_like = $this->conn->prepare($this->count_for_this_img());
        $get_like->execute();
        $count_like = $get_like->fetchAll();
        print_r($count_like[0][0]);
      }
  }

  public function get_user_id()
  {
      $find_user_id = $this->conn->prepare($this->get_user_id_from_table($this->user));
      $find_user_id->execute();
      $is_user_id = $find_user_id->fetchAll();
      $this->user = $is_user_id[0][0];
  }

  private function get_user_id_from_table() {
    return ("SELECT `id` FROM `users` WHERE `login`='$this->user'");
  }

  private function is_user_set_like() {
    return ("SELECT `img_id` FROM `like` WHERE `user_id`='$this->user' AND `img_id`='$this->img_id'");
  }

  private function set_like_in_table() {
    return ("INSERT INTO `like` (img_id, user_id) VALUES ('$this->img_id', '$this->user')");
  }

  private function remove_like_in_table() {
    return ("DELETE FROM `like` WHERE `img_id`='$this->img_id' AND `user_id`='$this->user'");
  }

  public function add_comment($comment, $user_sendmail) {
    $user = $this->user; /*$user chenget to user_id, in $user seve name in $this->user save user_id*/
    $this->get_user_id();
    $this->conn->exec($this->add_comment_to_table($comment));

    if ($this->user != $this->how_creat_photo() && $user_sendmail == 'true') {
      $this->send_mail($this->get_user_email());
    }
    echo 'add_comment';
  }

  private function add_comment_to_table($comment) {
    return ("INSERT INTO `comments` (img_id, user, comments) VALUES ('$this->img_id', '$this->user', '$comment')");
  }

  private function get_user_email() {
    $find_id_how_creat = $this->conn->prepare("SELECT `user_id` FROM `user_img` WHERE `img_id`='$this->img_id'");
    $find_id_how_creat->execute();
    $is_id_how_creat = $find_id_how_creat->fetchAll();
    $mail = $is_id_how_creat[0][0];
    $find_email_how_creat = $this->conn->prepare("SELECT `email` FROM `users` WHERE `id`='$mail'");
    $find_email_how_creat->execute();
    $is_email_how_creat = $find_email_how_creat->fetchAll();
    return ($is_email_how_creat[0][0]);
  }

  private function how_creat_photo() {
    $how_creat_photo = $this->conn->prepare($this->how_creat_photo_id());
    $how_creat_photo->execute();
    $is_id = $how_creat_photo->fetchAll();
    return ($is_id[0][0]);
  }
  private function how_creat_photo_id() {
    return ("SELECT `user_id` FROM `user_img` WHERE `img_id`='$this->img_id'");
  }

  private function send_mail($user_email) {
    $subject = 'New comment';
    $message = 'Some of user comment your photo';
    $header = 'MIME-version: 1.0' . "\r\n";
    $header .= 'Content-Type:text/html;charset=UTF-8' . "\r\n";
    $header .= 'From: noreply@camagru.com' . "\r\n";
    mail($user_email, $subject, $message, $header);
  }

  public function get_all_comment($img_id) {
    $get_all_comments = $this->conn->prepare($this->get_all_comment_table($img_id));
    $get_all_comments->execute();
    $value = $get_all_comments->fetchAll();
    print_r(json_encode($value));
  }

  private function get_all_comment_table($img_id) {
    return ("SELECT `img_id`,`comments`,`users`.`login`, `datetime` FROM `comments` INNER JOIN `users` ON `comments`.`user` = `users`.`id` WHERE `img_id`='$img_id' ORDER BY `datetime`");
  }

  public function get_user_name_by_img_id($img_id)
  {
    $find_how_creat_img = $this->conn->prepare("SELECT `user_id` FROM `user_img` WHERE `img_id`='$img_id'");
    $find_how_creat_img->execute();
    $creat_img = $find_how_creat_img->fetchAll();
    $user_id = $creat_img[0][0];

    $find_user_id = $this->conn->prepare("SELECT `login` FROM `users` WHERE `id`='$user_id'");
    $find_user_id->execute();
    $is_user_id = $find_user_id->fetchAll();
    $user_name = $is_user_id[0][0];
    return ($user_name);
  }
}
?>
