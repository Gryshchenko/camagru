window.onload = function() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('POST','../php/setup.php', true);
    // 3. Отсылаем запрос
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          if (xhr.responseText != 'Database ready')
          {
            document.getElementById('database_error').style.display = 'flex';
          }
          setUsername();
        };
    };
    xhr.send();
}

function profile() {
document.getElementsByClassName('profile_background')[0].style.display = 'block';
document.getElementsByClassName('profile')[0].style.display = 'block';
}

function coseProfile() {
  document.getElementsByClassName('profile_background')[0].style.display = 'none';
  document.getElementsByClassName('profile')[0].style.display = 'none';
}

function login() {
   var show = document.getElementById('login').style.display;
   var is_open_regist = document.getElementById('registrations').style.display;
   if (is_open_regist == 'none')
   {
      if (show == 'none')
         document.getElementById('login').style.display = 'block';
      else {
         document.getElementById('login').style.display = 'none';
      }
   }
   else
   {
      document.getElementById('registrations').style.display = 'none';
      if (show == 'none')
         document.getElementById('login').style.display = 'block';
      else {
         document.getElementById('login').style.display = 'none';
      }
   }
}

function registrations() {
   var show = document.getElementById('registrations').style.display;
   var is_open_login = document.getElementById('login').style.display;
   if (is_open_login == 'none')
   {
      if (show == 'none')
         document.getElementById('registrations').style.display = 'block';
      else
         document.getElementById('registrations').style.display = 'none';
   }
   else
   {
      document.getElementById('login').style.display = 'none';
      if (show == 'none')
         document.getElementById('registrations').style.display = 'block';
      else
         document.getElementById('registrations').style.display = 'none';
   }
}

function check_pass() {
     if (document.getElementsByClassName('js_reg_pass')[0].value !=
         document.getElementsByClassName('js_reg_passrepeat')[0].value) {
        document.getElementsByClassName('js_check_pass')[0].style.display = 'block';
     }
     else {
        document.getElementsByClassName('js_check_pass')[0].style.display = 'none';
     }
 }

var form = document.getElementById('registration');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  createUser();
});

function createUser() {
  var xhr = new XMLHttpRequest();
  var user = document.getElementsByClassName('js_reg_user')[0].value;
  var email = document.getElementsByClassName('js_reg_email')[0].value;
  var pass = document.getElementsByClassName('js_reg_pass')[0].value;
  var pass_repeat = document.getElementsByClassName('js_reg_passrepeat')[0].value;
  var data = new FormData();

  data.append('usernamesignup', user);
  data.append('emailsignup', email);
  data.append('passwordsignup', pass);
  data.append('passwordsignup_confirm', pass_repeat);
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var result = xhr.responseText;
        if (result == 'This mail is already taken')
          invalid_email();
        if (result == 'This login is already taken')
          invalid_login();
        if (result == 'Check your mail')
          success_reg();
      };
  };
  xhr.send(data);
}

function invalid_email() {
  document.getElementsByClassName('js_check_mail')[0].style.display = 'block';
}

function invalid_login() {
  document.getElementsByClassName('js_check_user')[0].style.display = 'block';
}

function close_error_message_email() {
  document.getElementsByClassName('js_check_mail')[0].style.display = 'none';
}

function close_error_message_user() {
  document.getElementsByClassName('js_check_user')[0].style.display = 'none';
}

function success_reg() {
  document.getElementsByClassName('js_success_reg_block')[0].style.display = 'none';
  document.getElementsByClassName('js_success_reg_none')[0].style.display = 'flex';
  setTimeout(function(){
    document.getElementsByClassName('js_success_reg_none')[0].style.display = 'none';
    document.getElementsByClassName('js_success_reg_block')[0].style.display = 'block';
    document.getElementById('registrations').style.display = 'none';
  }, 5000);
}

var form = document.getElementById('login_user');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  loginUser();
});

function loginUser() {
  var xhr = new XMLHttpRequest();
  var user = document.getElementsByClassName('js_login_user')[0].value;
  var pass = document.getElementsByClassName('js_login_pass')[0].value;
  var data = new FormData();

  data.append('usernamelogin', user);
  data.append('passwordlogin', pass);
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'connected')
        {
          document.getElementById('user_connected').innerHTML = user;
          document.getElementById('login').style.display = 'none';
          document.getElementsByClassName('js_nav_login')[0].style.display = 'none';
          document.getElementsByClassName('js_nav_registrations')[0].style.display = 'none';
          document.getElementsByClassName('js_nav_logout')[0].style.display = 'block';
          document.getElementsByClassName('js_nav_profile')[0].style.display = 'block';
          document.getElementsByClassName('js_nav_camera')[0].style.display = 'block';
        }
        else if (xhr.responseText == 'You should activate your account')
        {
          document.getElementsByClassName('js_login_error_active')[0].style.display = 'block';
        }
        else if (xhr.responseText == 'error')
        {
          document.getElementsByClassName('js_login_error_pass')[0].style.display = 'block';
        }
      };
  };
  xhr.send(data);
}

function close_error_message_login() {
  document.getElementsByClassName('js_login_error_active')[0].style.display = 'none';
  document.getElementsByClassName('js_login_error_pass')[0].style.display = 'none';
}

function logout() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('destroy_sesssion', '1');
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'disconnect')
        {
          document.getElementsByClassName('js_nav_logout')[0].style.display = 'none';
          document.getElementsByClassName('js_nav_profile')[0].style.display = 'none';
          document.getElementsByClassName('js_nav_registrations')[0].style.display = 'block';
          document.getElementsByClassName('js_nav_login')[0].style.display = 'block';
          document.getElementsByClassName('js_nav_camera')[0].style.display = 'none';
          document.getElementById('user_connected').innerHTML = '';
        }
      };
  };
  xhr.send(data);
}

function setUsername() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('check_sesssion', '1');
  xhr.open('POST','../php/autorisation.php', true);

  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE)
      {
          if (xhr.status === 200) {
            if (isNaN(xhr.responseText))
            {
              document.getElementsByClassName('js_nav_logout')[0].style.display = 'block';
              document.getElementsByClassName('js_nav_profile')[0].style.display = 'block';
              document.getElementById('user_connected').innerHTML = xhr.responseText;
            }
            else
            {
              document.getElementsByClassName('js_nav_registrations')[0].style.display = 'block';
              document.getElementsByClassName('js_nav_login')[0].style.display = 'block';
            }
          } else {
            alert( xhr.status + ': ' + xhr.statusText );
          }
      };
  };
  xhr.send(data);
}

var form = document.getElementById('change_login');
form.addEventListener('submit', function(event) {
  event.preventDefault();
    change_login();
});

function change_login() {
  var xhr = new XMLHttpRequest();
  var user = document.getElementsByClassName('js_change_login')[0].value;
  var data = new FormData();

  data.append('change_user_name', user);
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'Changes have been made successfully')
        {
          document.getElementsByClassName('js_change_value_login')[0].style.display = 'block';
          document.getElementById('change_login').style.display = 'none';
          document.getElementById('user_connected').innerHTML = user;
          setTimeout(function(){
            document.getElementsByClassName('js_change_value_login')[0].style.display = 'none';
            document.getElementById('change_login').style.display = 'block';
          }, 3000);
        }
        else if (xhr.responseText == 'A user already exists')
        {
          document.getElementsByClassName('js_change_value_user_found')[0].style.display = 'block';
        }
      };
  };
  xhr.send(data);
}

var form = document.getElementById('change_mail');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  change_email();
});

function change_email() {
  var xhr = new XMLHttpRequest();
  var mail = document.getElementsByClassName('js_change_mail')[0].value;
  var data = new FormData();

  data.append('change_user_mail', mail);
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'Changes have been made successfully')
        {
          document.getElementsByClassName('js_change_value_mail')[0].style.display = 'block';
          document.getElementById('change_mail').style.display = 'none';
          setTimeout(function(){
            document.getElementsByClassName('js_change_value_mail')[0].style.display = 'none';
            document.getElementById('change_mail').style.display = 'block';
          }, 3000);
        }
        else if (xhr.responseText == 'This email already exists')
        {
          document.getElementsByClassName('js_change_value_mail_found')[0].style.display = 'block';
        }
      };
  };
  xhr.send(data);
}

var form = document.getElementById('change_pass');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  change_pass();
});

function change_pass() {
  var xhr = new XMLHttpRequest();
  var old_pass = document.getElementsByClassName('js_change_pass_old')[0].value;
  var new_pass = document.getElementsByClassName('js_change_pass_new')[0].value;
  var new_pass_rep = document.getElementsByClassName('js_change_pass_rep')[0].value;
  var data = new FormData();

  data.append('change_user_pass', old_pass);
  data.append('change_user_newpass', new_pass);
  data.append('change_user_newpassrep', new_pass_rep);
  xhr.open('POST','../php/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'Changes have been made successfully')
        {
          document.getElementsByClassName('js_change_value_pass')[0].style.display = 'block';
          document.getElementById('change_pass').style.display = 'none';
          setTimeout(function(){
            document.getElementsByClassName('js_change_value_pass')[0].style.display = 'none';
            document.getElementById('change_pass').style.display = 'block';
          }, 3000);
        }
        else if (xhr.responseText == 'Old password not found')
        {
          document.getElementsByClassName('js_change_value_pass_old_not_found')[0].style.display = 'block';
        }
        else if (xhr.responseText == 'Old and new password must be different')
        {
          document.getElementsByClassName('js_change_value_pass_not_eql')[0].style.display = 'block';
        }
        else if (xhr.responseText == 'Password is not identical')
        {
          document.getElementsByClassName('js_change_value_pass_not_found')[0].style.display = 'block';
        }
      };
  };
  xhr.send(data);
}

function profile_close_error_message_email() {
  document.getElementsByClassName('js_change_value_mail_found')[0].style.display = 'none';
}

function profile_close_error_message_login() {
  document.getElementsByClassName('js_change_value_user_found')[0].style.display = 'none';
}

function profile_close_error_message_pass_old_not_found() {
  document.getElementsByClassName('js_change_value_pass_old_not_found')[0].style.display = 'none';
}

function profile_close_error_message_pass_not_found() {
  document.getElementsByClassName('js_change_value_pass_not_found')[0].style.display = 'none';
}

function profile_close_error_message_pass_not_eql() {
  document.getElementsByClassName('js_change_value_pass_not_eql')[0].style.display = 'none';
}

function camera() {
document.getElementsByClassName('profile_background')[0].style.display = 'block';
document.getElementsByClassName('camera')[0].style.display = 'block';
}

function coseCamera() {
  document.getElementsByClassName('profile_background')[0].style.display = 'none';
  document.getElementsByClassName('camera')[0].style.display = 'none';
}
