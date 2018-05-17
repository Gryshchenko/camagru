<?php
include './database.php';
include './Registration.class.php';
include './Login.class.php';
include './ChengeUserData.class.php';

session_start();
if (empty($_SESSION['user']) == TRUE)
{
  if (isset($_POST['usernamesignup']))
  {
    $object = new Registrations($_POST['usernamesignup'], $_POST['emailsignup'], $_POST['passwordsignup'], $_POST['passwordsignup_confirm']);
    $object->user_registration($db_location, $db_name, $db_user, $db_password);
  }
  if (isset($_POST['usernamelogin']))
  {
    $object = new Login($_POST['usernamelogin'], $_POST['passwordlogin']);
    $object->user_connecting($db_location, $db_name, $db_user, $db_password);
  }
  if (isset($_POST['send_password']))
  {
    $object = new Registrations('0', '0', '0', '0');
    $object->send_user_pass_onmail($_POST['send_password'], $db_location, $db_name, $db_user, $db_password); /*class registration*/
  }
}
else if (empty($_SESSION['user']) == FALSE)
{
  if (isset($_POST['check_sesssion']))
  {
    if (isset($_SESSION['user']))
      echo $_SESSION['user'];
  }
  else if (isset($_POST['destroy_sesssion']))
  {
    $_SESSION['user'] = 0;
    session_destroy();
    echo "disconnect";
  }
  else if (isset($_POST['change_user_name']))
  {
    $object = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    $object->user_change_login($_SESSION['user'], $_POST['change_user_name']);
  }
  else if (isset($_POST['change_user_mail']))
  {
    $object = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    $object->user_change_email($_SESSION['user'], $_POST['change_user_mail']);
  }
  else if (isset($_POST['change_user_pass']) && isset($_POST['change_user_newpass']) && isset($_POST['change_user_newpassrep']))
  {
    $object = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    $object->user_change_pass($_SESSION['user'], hash('sha256',$_POST['change_user_pass']), hash('sha256',$_POST['change_user_newpass']), hash('sha256',$_POST['change_user_newpassrep']));
  }
  else if (isset($_POST['what_mail_send']))
  {
    $object = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    print_r($object->get_send_mail_status($_SESSION['user']));
  }
  else if (isset($_POST['change_send_mail']))
  {
    $object = new ChengeUserData($db_location, $db_name, $db_user, $db_password);
    $object->set_send_mail_status($object->get_send_mail_status($_SESSION['user']), $_SESSION['user']);
    print_r($object->get_send_mail_status($_SESSION['user']));
  }
}
?>
