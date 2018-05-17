<?php
include './Install_db.class.php';
include './database.php';
include './getImage.class.php';

session_start();

if (isset($_SESSION['user'])) {
  if (isset($_POST['user_photo'])) {
    $object = new getImage($db_location, $db_name, $db_user, $db_password);
    $object->get_all_current_user($_SESSION['user']);

  }
  if (isset($_POST['remove_user_photo'])) {
    $object = new getImage($db_location, $db_name, $db_user, $db_password);
    $object->remove_user_photo($_POST['remove_user_photo']);
  }
}

if (isset($_POST['get_img'])) {
  $object = new getImage($db_location, $db_name, $db_user, $db_password);
  $object->get_img_src($_POST['get_img']);
}

if (isset($_POST['get_pagination'])) {
  $object = new getImage($db_location, $db_name, $db_user, $db_password);
  $object->count_pagination();
}

if (isset($_POST['get_comment_img'])) {
  $object = new getImage($db_location, $db_name, $db_user, $db_password);
  print_r($object->get_comment_img($_POST['get_comment_img']));
}
?>
