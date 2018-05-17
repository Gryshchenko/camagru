<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Camagru</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0 , minimum-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
    <nav class="nav_flex">
      <div>
        <ul class="text_rotate text_style text_list_flex nav_margin">
          <li class="nav_margin_link js_nav_login"><a class="nav_link" href="#" onclick="login()">Login</a></li>
          <li class="nav_margin_link js_nav_logout"><a class="nav_link" href="#" onclick="logout()">Logout</a></li>
          <li class="nav_margin_link js_nav_profile"><a class="nav_link" href="#" onclick="profile()">Profile</a></li>
          <li class="nav_margin_link js_nav_registrations"><a class="nav_link" href="#" onclick="registrations()">Registrations</a></li>
          <li class="nav_margin_link js_nav_camera"><a class="nav_link js_nav_camera" href="#" onclick="camera()">Camera</a></li>
        </ul>
      </div>
      <div class="title text_style title_margin anim-typewriter">Camagru</div>
    </nav>
    <div class="form_regist_position" id="registrations">
      <form class="js_success_reg_block form_border" method="POST" autocomplete="on" id="registration">
        <h1>Registrations</h1>
        <p>
          <input class="js_reg_user" name="usernamesignup" required type="text" placeholder="Username" onchange="close_error_message_user()" pattern="[a-z]{1,15}">
        </p><span class="js_check_user error_message_style">This user already registered</span>
        <p> 
          <input class="js_reg_email" name="emailsignup" required type="email" placeholder="Yourmail@gmail.com" onchange="close_error_message_email()" pattern="^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$">
        </p><span class="js_check_mail error_message_style">This email already registered</span>
        <p>
          <input class="js_reg_pass" name="passwordsignup" required type="text" placeholder="eg. X8df!90EO" onchange="check_pass()">
        </p>
        <p>
          <input class="js_reg_passrepeat" name="passwordsignup_confirm" required type="text" placeholder="eg. X8df!90EO" onchange="check_pass()">
        </p><span class="js_check_pass error_message_style">Passwords not equal</span>
        <p>
          <input class="form_regist_button" type="submit" name="Sing_up" value="Sign up">
        </p>
      </form>
      <div class="js_success_reg success_reg_style js_success_reg_none">
        <p>Congratulations Your Registration Was Successful</p>
        <p>You only need to confirm your registration! </p>
        <p>Click on the links you get on your mail</p>
      </div>
    </div>
    <div class="form_login_position" id="login">
      <form class="form_border" autocomplete="on" id="login_user">
        <h1>Login </h1>
        <p>
          <input class="js_login_user" onchange="close_error_message_login()" name="usernamelogin" required="required" type="text" placeholder="Username">
        </p>
        <p>
          <input class="js_login_pass" onchange="close_error_message_login()" name="passwordlogin" required="required" type="password" placeholder="eg. X8df!90EO">
        </p><span class="js_login_error_active error_message_style">You should activate your account</span><span class="js_login_error_pass error_message_style">Wrong password of login please try again</span>
        <p>
          <input class="form_login_button" type="submit" name="Login" value="Login">
        </p>
      </form>
    </div>
    <div class="database_error" id="database_error">
      <div class="database_error_position">
        <p>Connection to database wasn't established</p>
      </div>
    </div>
    <sections class="gallery"> 
      <div class="user_show">
        <p class="user_text_style" id="user_connected"></p>
      </div>
      <div class="photo"></div>
    </sections>
    <sections class="profile_background"></sections>
    <sections class="profile">
      <div class="prifle_data">
        <div class="link_close">
          <p class="title_profile">Profile</p><a class="link_underline" href="#" onclick="coseProfile()">Close</a>
        </div>
        <div class="profile_user">
          <div class="profile_user_form">
            <div class="_form_name">
              <form id="change_login">
                <p>
                  <input class="js_change_login" onchange="profile_close_error_message_login()" name="" required="required" type="text" placeholder="Username" pattern="[a-z]{1,15}">
                </p><span class="js_change_value_user_found change_value_style">A user already exists </span>
                <p>
                  <input class="button_border" type="submit" name="Login" value="Change your login">
                </p>
              </form>
              <div class="change_value_sections js_change_value_login">
                <p class="js_change_value_login_value">Changes have been made successfully</p>
              </div>
            </div>
            <div class="_form_mail">
              <form id="change_mail">
                <p>
                  <input class="js_change_mail" onchange="profile_close_error_message_email()" name="" required="required" type="text" placeholder="Usermail" pattern="^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$">
                </p><span class="js_change_value_mail_found change_value_style">This email already exists </span>
                <p>
                  <input class="button_border" type="submit" name="Login" value="Change your mail">
                </p>
              </form>
              <div class="change_value_sections js_change_value_mail">
                <p>Changes have been made successfully</p>
              </div>
            </div>
            <div class="_form_pass">
              <form id="change_pass">
                <p>
                  <input class="js_change_pass_old" onchange="profile_close_error_message_pass_old_not_found()" name="" required="required" type="password" placeholder="Old password">
                </p><span class="js_change_value_pass_old_not_found change_value_style">Old password not found</span>
                <p>
                  <input class="js_change_pass_new" onchange="profile_close_error_message_pass_not_found()" name="" required="required" type="password" placeholder="New password">
                </p><span class="js_change_value_pass_not_found change_value_style">Password is not identical</span>
                <p>
                  <input class="js_change_pass_rep" onchange="profile_close_error_message_pass_not_eql()" name="" required="required" type="password" placeholder="Repeat new password">
                </p><span class="js_change_value_pass_not_eql change_value_style">Old and new password must be different</span>
                <p>
                  <input class="button_border" type="submit" name="Login" value="Change your password">
                </p>
              </form>
              <div class="change_value_sections js_change_value_pass">
                <p>Changes have been made successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sections>
    <sections class="camera">
      <div class="camera_data">
        <div class="link_close">
          <p class="title_profile">Camera</p><a class="link_underline" href="#" onclick="coseCamera()">Close</a>
        </div>
        <div class="camera_view" id="container">
          <div id="video_container">
            <video autoplay="true" id="videoElement"></video>
            <canvas id="canvas"></canvas>
          </div>
          <div class="images"><img class="img_style" src="../img/actors_0.png"><img class="img_style" src="../img/actors_1.png"><img class="img_style" src="../img/ak-47.png"><img class="img_style" src="../img/beard_0.png"><img class="img_style" src="../img/beard_1.png"><img class="img_style" src="../img/beard_2.png"><img class="img_style" src="../img/beard_3.png"><img class="img_style" src="../img/beard_4.png"><img class="img_style" src="../img/beard_5.png"><img class="img_style" src="../img/bomb.png"><img class="img_style" src="../img/girls_0.png"><img class="img_style" src="../img/girls_1.png"><img class="img_style" src="../img/other_0.png"><img class="img_style" src="../img/other_1.png"><img class="img_style" src="../img/bow_0.png"><img class="img_style" src="../img/bow_1.png"><img class="img_style" src="../img/cap_0.png"><img class="img_style" src="../img/cap_1.png"><img class="img_style" src="../img/cap_2.png"><img class="img_style" src="../img/cap_3.png"><img class="img_style" src="../img/hair_0.png"><img class="img_style" src="../img/hair_1.png"><img class="img_style" src="../img/hair_2.png"><img class="img_style" src="../img/hair_3.png"><img class="img_style" src="../img/hair_4.png"><img class="img_style" src="../img/hair_5.png"><img class="img_style" src="../img/hair_6.png"><img class="img_style" src="../img/hair_7.png"><img class="img_style" src="../img/headphones_0.png"><img class="img_style" src="../img/headphones_1.png"><img class="img_style" src="../img/scar_0.png"><img class="img_style" src="../img/scar_1.png"><img class="img_style" src="../img/scar_2.png"><img class="img_style" src="../img/sheriff_0.png"><img class="img_style" src="../img/sheriff_1.png"><img class="img_style" src="../img/sheriff_2.png"><img class="img_style" src="../img/teeth_0.png"></div>
        </div>
        <div class="control_button"><a class="makephoto_button makephoto_block" href="#" id="cameraOn">Camera on</a><a class="makephoto_button makephoto_none" href="#" id="cameraOff">Camera off </a><a class="makephoto_button makephoto_none" href="#" id="makePhoto">Make photo</a><a class="makephoto_button makephoto_none" href="#" id="savePhoto">Save photo</a><a class="makephoto_button makephoto_none" href="#" id="makePhoto">Make photo</a><a class="makephoto_button makephoto_none" href="#" id="savePhoto">Save photo</a><a class="makephoto_button" href="#" id="increase">+</a><a class="makephoto_button" href="#" id="decrease">-</a><a class="makephoto_button makephoto_none" href="#" id="downloadPhoto">Download</a><a class="makephoto_button makephoto_none" href="#" id="remove">Remove last</a></div>
      </div>
    </sections>
    <script src="/js/scripts.js"></script>
    <script src="/js/camera.js"></script>
  </body>
</html>