<?php
class ChengeUserData
{
	private $db_location;
	private $db_name;
	private $db_user;
	private $db_password;


	public function __construct($db_location, $db_name, $db_user, $db_password)
	{
			$this->db_location = $db_location;
			$this->db_name = $db_name;
			$this->db_user = $db_user;
			$this->db_password = $db_password;
	}

	public function user_change_login($username, $new_username) {
		try {
			$conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$find_user = $conn->prepare($this->get_user_from_table($new_username));
			$find_user->execute();
			$is_user = $find_user->fetchAll();
			if ($this->is_value_not_exist($is_user) == '0') {
				$conn->exec($this->set_user_in_table($username, $new_username));
				$_SESSION['user'] = $new_username;
				echo "Changes have been made successfully";
			}
			else {
				echo "A user already exists";
			}
		} catch (PDOException $e) {
			echo "Connection failed: " . $e->getMessage();
		}
	}

	private function get_user_from_table($username) {
		return ("SELECT `login` FROM `users` WHERE `login`='$username'");
	}

	private function set_user_in_table($username, $new_username) {
		return ("UPDATE users SET login = '$new_username' WHERE `login`='$username'");
	}

	private function is_value_not_exist($is_user) {
		if (empty($is_user) == TRUE)
			return ('0');
		return ('1');
	}

	public function user_change_email($user, $new_email) {
		try {
			$conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$find_mail = $conn->prepare($this->get_mail_from_table($new_email));
			$find_mail->execute();
			$is_mail = $find_mail->fetchAll();
			if ($this->is_value_not_exist($is_mail) == '0') {
				$conn->exec($this->set_mail_in_table($user, $new_email));
				echo "Changes have been made successfully";
			}
			else {
				echo "This email already exists";
			}
		} catch (PDOException $e) {
			echo "Connection failed: " . $e->getMessage();
		}
	}

	private function get_mail_from_table($new_email) {
		return ("SELECT `login` FROM `users` WHERE `email`='$new_email'");
	}

	private function set_mail_in_table($user, $new_email) {
		return ("UPDATE users SET email = '$new_email' WHERE `login`='$user'");
	}

	public function user_change_pass($user, $old_pass, $new_pass, $rep_pass) {
		if ($this->is_passwords_equal($new_pass, $rep_pass) == '0')
		{
			if ($this->is_passwords_equal($old_pass, $rep_pass) == '1' &&
					$this->is_passwords_equal($old_pass, $new_pass) == '1')
			{
				try {
					$conn = new PDO("mysql:host=$this->db_location;dbname=$this->db_name", $this->db_user, $this->db_password);
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

					$find_user = $conn->prepare($this->get_user_from_table($user));
					$find_user->execute();
					$is_user = $find_user->fetchAll();

					$find_pass = $conn->prepare($this->get_pass_from_table($old_pass));
					$find_pass->execute();
					$is_pass = $find_pass->fetchAll();
					if ($this->is_value_not_exist($is_pass) == '1')
					{
						if ($this->is_value_not_exist($is_user) == '1') {
							$conn->exec($this->set_pass_in_table($user, $new_pass));
							echo "Changes have been made successfully";
						}
					}
					else {
						echo "Old password not found";
					}
				} catch (PDOException $e) {
					echo "Connection failed: " . $e->getMessage();
				}
			}
			else {
				echo "Old and new password must be different";
			}
		}
		else {
			echo "Password is not identical";
		}
	}

	private function is_passwords_equal($new_pass, $rep_pass) {
		if (strcmp($new_pass, $rep_pass) == '0')
			return ('0');
		return ('1');
	}
	private function get_pass_from_table($old_pass) {
		return ("SELECT `login` FROM `users` WHERE `password`='$old_pass'");
	}

	private function set_pass_in_table($user, $new_pass) {
		return ("UPDATE users SET password = '$new_pass' WHERE `login`='$user'");
	}
}
?>
