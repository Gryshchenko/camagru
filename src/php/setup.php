<?php
include './Install_db.class.php';
include './database.php';

$object = new Install_db($db_location, $db_name, $db_user, $db_password);
$object->creat_db();
?>
