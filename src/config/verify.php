<?php
include './database.php';
include './Verify.class.php';

if ($_GET['email'] && $_GET['hash']) {
  $object = new Verify($_GET['email'], $_GET['hash']);
  $object->user_verify($db_location, $db_name, $db_user, $db_password);
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Camagru</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0 , minimum-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="../css/main.css">
  </head>
  <body class="verify_style">
    <div class="verify_block_style">
      <p class="verify_text">Your account is activated</p>
      <p class="verify_text">You can use <span>Camagru</span></p>
      <p class="verify_text">in few seconds you will be redirect to camargo website</p>
      <a class="verify_link" href="http://localhost:8100/">Visit Camagru</a>
    </div>
  </body>
  <script>
    window.onload = function() {
      setTimeout(function(){
        window.location.replace("http://localhost:8100/");
      }, 5000);
    }
  </script>
</html>
