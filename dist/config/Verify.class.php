<?php
class Verify {

  private $user_email;
  private $verifications_code;

  public function __construct($user_email, $verifications_code)
  {
      $this->user_email = $user_email;
      $this->verifications_code = $verifications_code;
  }

  public function user_verify($db_location, $db_name, $db_user, $db_password) {
    try {
      $conn = new PDO("mysql:host=$db_location;dbname=$db_name", $db_user, $db_password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $find_verificationscode = $conn->prepare($this->get_verificationscode_from_table());
      $find_email = $conn->prepare($this->get_mail_from_table());
      $find_verificationscode->execute();
      $find_email->execute();
      $is_verificationscode = $find_verificationscode->fetchAll();
      $is_email = $find_email->fetchAll();
      if ($this->is_verificationscode_not_exist($is_verificationscode) == 0 && $this->is_email_not_exist($is_email) == 0) {
            $conn->exec($this->user_activate());
            $conn->exec($this->set_to_null());
      }
      else {
      }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
  }

  private function get_verificationscode_from_table() {
    return ("SELECT `login` FROM `users` WHERE `verifications_code`='$this->verifications_code'");
  }

  private function get_mail_from_table() {
    return ("SELECT `login` FROM `users` WHERE `email`='$this->user_email'");
  }

  private function is_verificationscode_not_exist($is_verificationscode) {
    if (empty($is_verificationscode) == FALSE)
      return ('0');
    return ('1');
  }

  private function is_email_not_exist($is_email) {
    if (empty($is_email) == FALSE)
      return ('0');
    return ('1');
  }

  private function user_activate() {
    return ("UPDATE `users` SET `verifications`='true' where `verifications_code`='$this->verifications_code'");
  }

  private function set_to_null() {
    return ("UPDATE `users` SET `verifications_code`='0' where `verifications_code`='$this->verifications_code'");
  }
}
?>
