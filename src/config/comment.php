<?php
include './database.php';
include './Social.class.php';
include './ChengeUserData.class.php';

session_start();

if (isset($_POST['all_comment_by_img_id']))
{
  $object = new social($_SESSION['user'], $_POST['all_comment_by_img_id'], $db_location, $db_name, $db_user, $db_password);
  $object->get_all_comment($_POST['all_comment_by_img_id']);
}

if (empty($_SESSION['user']) == FALSE) {
  if (isset($_POST['get_comment']) && isset($_POST['img_id'])) {
    $comment = htmlentities($_POST['get_comment'], ENT_QUOTES);
    $object = new social($_SESSION['user'], $_POST['img_id'], $db_location, $db_name, $db_user, $db_password);
    $object_userdata = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    $user_name =  $object->get_user_name_by_img_id($_POST['img_id']);
    $object->add_comment($comment, $object_userdata->get_send_mail_status($user_name));
  }
} else {
}


?>
