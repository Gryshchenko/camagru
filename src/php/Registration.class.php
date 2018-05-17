<?php
class Registrations
{
    private $username;
    private $user_email;
    private $user_pass;
    private $user_pass_rep;
		private $verifications_code;

    public function __construct($username, $user_email, $user_pass, $user_pass_rep)
		{
        $this->username = $username;
        $this->user_email = $user_email;
        $this->user_pass = hash('sha256', $user_pass);
        $this->user_pass_rep = hash('sha256', $user_pass_rep);
				$this->verifications_code = uniqid();
    }

		public function user_registration($db_location, $db_name, $db_user, $db_password) {
			if ($this->is_passwords_equal() == '0')
			{
				try {
					$conn = new PDO("mysql:host=$db_location;dbname=$db_name", $db_user, $db_password);
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					$find_user = $conn->prepare($this->get_user_from_table());
					$find_email = $conn->prepare($this->get_mail_from_table());
					$find_user->execute();
					$find_email->execute();
					$is_user = $find_user->fetchAll();
					$is_email = $find_email->fetchAll();
					if ($this->is_user_not_exist($is_user) == 0) {
						if ($this->is_email_not_exist($is_email) == 0) {
							$conn->exec($this->set_user_in_table());
							if ($this->confirm_mail()) {
				        echo "Check your mail";
				      } else {
				        echo "Something wrong";
				      }
						}
						else {
							echo "This mail is already taken";
						}
					}
					else {
						echo "This login is already taken";
					}
				} catch (PDOException $e) {
					echo "Connection failed: " . $e->getMessage();
				}
			}
			else {
				echo "password not equal";
			}
		}

		private function is_passwords_equal() {
			if (strcmp($this->user_pass, $this->user_pass_rep) == '0')
				return ('0');
			return ('1');
		}

		private function is_user_not_exist($is_user) {
			if (empty($is_user) == TRUE)
				return ('0');
			return ('1');
		}

		private function is_email_not_exist($is_email) {
			if (empty($is_email) == TRUE)
				return ('0');
			return ('1');
		}

		private function get_user_from_table() {
			return ("SELECT `login` FROM `users` WHERE `login`='$this->username'");
		}

		private function get_mail_from_table() {
			return ("SELECT `login` FROM `users` WHERE `email`='$this->user_email'");
		}

		private function set_user_in_table() {
			return ("INSERT INTO users (login, email, password, verifications_code)
			VALUES ('$this->username', '$this->user_email', '$this->user_pass', '$this->verifications_code')");
		}

		private function confirm_mail() {
			$subject = 'Signup | Verification';
      $message = 'Thanks for signing up!
                        Your account has been created, you can login after you have activated your account by pressing the url below.
                        http://localhost:8100/php/verify.php?email='.$this->user_email.'&hash='.$this->verifications_code.'';
      $header = 'MIME-version: 1.0' . "\r\n";
      $header .= 'Content-Type:text/html;charset=UTF-8' . "\r\n";
      $header .= 'From: noreply@camagru.com' . "\r\n";
      return (mail($this->user_email, $subject, $message, $header));
		}
}
?>
