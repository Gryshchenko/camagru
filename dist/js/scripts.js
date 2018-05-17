window.onload = function() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('POST','../config/setup.php', true);
    // 3. Отсылаем запрос
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          if (xhr.responseText != 'Database ready')
          {
            document.getElementById('database_error').style.display = 'flex';
          }
          setUsername();
          get_img_from_table();
        };
    };
    xhr.send();
}

function profile() {
document.getElementsByClassName('profile_background')[0].style.display = 'block';
document.getElementsByClassName('profile')[0].style.display = 'block';
  get_mail_send_value();
}

function coseProfile() {
  document.getElementsByClassName('profile_background')[0].style.display = 'none';
  document.getElementsByClassName('profile')[0].style.display = 'none';

}

function get_mail_send_value() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('what_mail_send', '0');
  xhr.open('POST','../config/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'true') {
          document.getElementsByClassName('mail_status')[0].value = 'On';
          document.getElementsByClassName('mail_status')[0].style.background = '#00d27f';
        }
        if (xhr.responseText == 'false') {
          document.getElementsByClassName('mail_status')[0].value = 'Off';
          document.getElementsByClassName('mail_status')[0].style.background = '#ff0000';
        }
      };
  };
  xhr.send(data);
}


var form = document.getElementById('comment_mail');
form.addEventListener('submit', function(event) {
  event.preventDefault();
    change_send_mail_value();
});

function change_send_mail_value() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('change_send_mail', '0');
  xhr.open('POST','../config/autorisation.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText == 'true') {
          document.getElementsByClassName('mail_status')[0].value = 'On';
          document.getElementsByClassName('mail_status')[0].style.background = '#00d27f';
        }
        if (xhr.responseText == 'false') {
          document.getElementsByClassName('mail_status')[0].value = 'Off';
          document.getElementsByClassName('mail_status')[0].style.background = '#ff0000';
        }
      };
  };
  xhr.send(data);
}

function login() {
   var show = document.getElementById('login').style.display;
   var is_open_regist = document.getElementById('registrations').style.display;
   document.getElementsByClassName('_form_fogot_password')[0].style.display = 'none';
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
   document.getElementsByClassName('_form_fogot_password')[0].style.display = 'none';
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


 function fogot_password() {
   document.getElementById('login').style.display = 'none';
   document.getElementById('registrations').style.display = 'none';
   document.getElementById('registrations').style.display = 'none';
   document.getElementsByClassName('_form_fogot_password')[0].style.display = 'block';
 }

 var send_password = document.getElementById('fogot_password');
 send_password.addEventListener('submit', function(event) {
   event.preventDefault();
   send_user_password();
 });

 function send_user_password() {
   var xhr = new XMLHttpRequest();
   var data = new FormData();
   var email = document.getElementsByClassName('js_fogot_pass')[0].value;

   data.append('send_password', email);
   xhr.open('POST','../config/autorisation.php', true);
   xhr.onreadystatechange = function () {
       if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
         if (xhr.responseText == 'change') {
           document.getElementsByClassName('_form_fogot_password')[0].style.display = 'none';
           document.getElementsByClassName('_changet_fogot_password')[0].style.display = 'block';
           setTimeout(function(){
             document.getElementsByClassName('_changet_fogot_password')[0].style.display = 'none';
           }, 3000);
         }
       };
   };
   xhr.send(data);
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
  xhr.open('POST','../config/autorisation.php', true);
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
  xhr.open('POST','../config/autorisation.php', true);
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
  xhr.open('POST','../config/autorisation.php', true);
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
  xhr.open('POST','../config/autorisation.php', true);

  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE)
      {
          if (xhr.status === 200) {
            if (isNaN(xhr.responseText))
            {
              document.getElementsByClassName('js_nav_logout')[0].style.display = 'block';
              document.getElementsByClassName('js_nav_profile')[0].style.display = 'block';
              document.getElementsByClassName('js_nav_camera')[0].style.display = 'block';
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
  xhr.open('POST','../config/autorisation.php', true);
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
  xhr.open('POST','../config/autorisation.php', true);
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
  xhr.open('POST','../config/autorisation.php', true);
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

function get_img_from_table() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('get_img', '0');
  xhr.open('POST','../config/load_img.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var obj = JSON.parse(xhr.responseText);
        put_img(obj).then(function() {
          get_pagination_from_table();
          set_like_all_img();
        });
      }
  };
  xhr.send(data);
}

var put_img = function put_img(obj) {
  return new Promise(function(resolve, reject) {

    var user_img = document.getElementById('user_img');
    var i = 0;
    var max_img_in_div = parseInt(obj.length);
    var paginationDiv = creat_pagination_div(document.createElement('div'));

    remove_previous_pagination();
    //set_active_page();
    user_img.appendChild(paginationDiv);
    while(i < max_img_in_div) {
      var newDiv = creat_div(document.createElement('div'));
      var newImg = creat_img(document.createElement('img'));
      var socialDiv = social_block(document.createElement('div'));
      var likeDiv = creat_like(document.createElement('a'));
      var commentsDiv = creat_comments(document.createElement('a'));
      var commentsSpan = comments_img(document.createElement('span'));
      var likeSpan = like_img(document.createElement('span'));
      var likeQuantity = like_quantity(document.createElement('span'));

      paginationDiv.appendChild(newDiv);
      newDiv.appendChild(newImg);
      newDiv.appendChild(socialDiv);
      socialDiv.appendChild(likeDiv);
      likeDiv.appendChild(likeSpan);
      likeDiv.appendChild(likeQuantity);
      socialDiv.appendChild(commentsDiv);
      commentsDiv.appendChild(commentsSpan);
      i++;
    }
    resolve();
    function remove_previous_pagination()
    {
      var removeDiv = document.getElementById("pagination");
      if (removeDiv !== null)
        removeDiv.parentNode.removeChild(removeDiv);
    }

    function set_active_page()
    {
      var element = document.getElementById('pagination_links').getElementsByTagName('a');
      //console.log(element);
      document.getElementById('page_1').classList.add('active');
    }

    function creat_pagination_div(paginationDiv)
    {
      paginationDiv.id = 'pagination';
      paginationDiv.className = 'pagination_block';
      return (paginationDiv);
    }

    function creat_div(newDiv)
    {
      var id = obj[i][1].split('.');
      newDiv.id = id[0];
      newDiv.className = 'img_block';
      return (newDiv);
    }

    function creat_img(newImg)
    {
      newImg.className = 'img_global_style';
      newImg.src = "../photos/" + obj[i][1];
      return (newImg);
    }
    function social_block(socialDiv)
    {
      socialDiv.className = 'social_block';
      return (socialDiv);
    }

    function creat_like(likeDiv)
    {
      likeDiv.className = 'social_link';
      likeDiv.setAttribute("onclick", "like();");
      return (likeDiv);
    }

    function creat_comments(commentsDiv)
    {
      commentsDiv.className = 'social_link';
      commentsDiv.setAttribute("onclick", "comments();");
      return (commentsDiv);
    }

    function like_img(likeSpan)
    {
      likeSpan.className = 'social_like';
      likeSpan.textContent = 'Like';
      return (likeSpan);
    }

    function comments_img(commentsSpan)
    {
      commentsSpan.className = 'social_comment';
      commentsSpan.textContent = 'Comments';
      return (commentsSpan);
    }
    function like_quantity(likeQuantity)
    {
      likeQuantity.className = 'social_like_quantity';
      return (likeQuantity);

    }
  });
}

function get_pagination_from_table() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('get_pagination', '1');
  xhr.open('POST','../config/load_img.php', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        pagination_list(xhr.responseText);
      }
  };
  xhr.send(data);
}

function pagination_list(value) {
  var pagination = document.getElementById('pagination_links');
  var lenght = parseInt(value);
  var i = 0;

  while(i < lenght) {
    var newLink = creat_link(document.createElement('a'));

    pagination.appendChild(newLink);
    i++;
  }

  function creat_link(newLink)
  {
    newLink.id = 'page_' + i;
    newLink.className = 'page_style';
    newLink.style.background = "#"+((1<<24)*Math.random()|0).toString(16);
    newLink.setAttribute("onclick", "showPage();");
    return (newLink);
  }
}

function showPage() {
  var find_id = event.target.id;
  var tmp = find_id.split('_');
  var get_page = tmp[1];

  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('get_img', get_page);
  xhr.open('POST','../config/load_img.php', true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var obj = JSON.parse(xhr.responseText);
      put_img(obj);
      set_like_all_img();
    }
  };
  xhr.send(data);
}

function remove_previous_active() {
  var element = document.getElementsByClassName('active');
  element[0].classList.remove("active");
}

function put_active(find_id) {
  document.getElementById(find_id).classList.add('active');
}
