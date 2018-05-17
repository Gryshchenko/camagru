<?php
include './Install_db.class.php';
include './database.php';
include './saveImagename.class.php';
include './getImage.class.php';

session_start();
if (isset($_POST['get_img'])) {
  $object = new getImage($db_location, $db_name, $db_user, $db_password);
  $object->get_img_src();
}

if (empty($_SESSION['user']) == TRUE)
  echo 'only registered user can save photos';
else if (empty($_SESSION['user']) == FALSE && isset($_POST['img'])) {
  $object = new saveImagename($db_location, $db_name, $db_user, $db_password, $_SESSION['user']);
  $object->put_filename_database($_POST['img']);
}
?>
