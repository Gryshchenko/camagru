<?php
include './database.php';
include './Social.class.php';

session_start();

if (isset($_POST['get_quantity_all'])) {
  $object = new social('0', $_POST['get_quantity_all'], $db_location, $db_name, $db_user, $db_password);
  $object->get_all_like();
}

if (empty($_SESSION['user']) == FALSE) {
  if (isset($_POST['get_img_id'])) {
    $object = new social($_SESSION['user'], $_POST['get_img_id'], $db_location, $db_name, $db_user, $db_password);
    $object->set_like();
  }
}

else {
  if (empty($_SESSION['user_set']) == TRUE && isset($_POST['user_set'])) {
    echo 'no_user';
  }
}
?>
