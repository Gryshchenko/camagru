<?php
class Login {

  private $user_login;
  private $user_password;

  public function __construct($user_login, $user_password)
  {
      $this->user_login = $user_login;
      $this->user_password = hash('sha256', $user_password);
  }

  public function user_connecting($db_location, $db_name, $db_user, $db_password) {
    try {
      $conn = new PDO("mysql:host=$db_location;dbname=$db_name", $db_user, $db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $user_password = $conn->prepare($this->get_password_from_table());
      $user_verifications = $conn->prepare($this->get_verifications_from_table());
      $user_login = $conn->prepare($this->get_login_from_table());
      $user_password->execute();
      $user_verifications->execute();
      $user_login->execute();
      $is_password = $user_password->fetchAll();
      $is_login = $user_login->fetchAll();
      $is_verifications = $user_verifications->fetchAll();
      if ($this->is_password_not_exist($is_password) == 0 && $this->is_login_not_exist($is_login) == 0) {
        if ($is_verifications[0][0] == 'false')
          echo "You should activate your account";
        else if ($is_verifications[0][0] == 'true')
        {
          $_SESSION['user'] = $this->user_login;
          echo "connected";
        }
      }
      else {
        echo "error";
      }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
  }
  private function get_password_from_table() {
    return ("SELECT `login` FROM `users` WHERE `password`='$this->user_password'");
  }

  private function get_login_from_table() {
    return ("SELECT `password` FROM `users` WHERE `login`='$this->user_login'");
  }

  private function get_verifications_from_table() {
    return ("SELECT `verifications` FROM `users` WHERE `login`='$this->user_login'");
  }

  private function is_password_not_exist($is_password) {
    if (empty($is_password) == FALSE)
      return ('0');
    return ('1');
  }

  private function is_login_not_exist($is_login) {
    if (empty($is_login) == FALSE)
      return ('0');
    return ('1');
  }

  public function user_session()
  {
    return ($_SESSION['user']);
  }

}
?>
