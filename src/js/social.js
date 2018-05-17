var comment_img_id;
function like() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();
  var id = event.target.parentNode.parentNode.parentNode.id;

  data.append('get_img_id', id);
  xhr.open('POST','../config/social.php', true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var value = parseInt(xhr.responseText);
      if (isNaN(value) == false && value > -1)
        document.getElementById(id).childNodes[1].childNodes[0].childNodes[1].innerHTML = xhr.responseText;
    }
  };
  xhr.send(data);
}

function set_like_all_img() {
  var i = 0;
  var counter = document.getElementById('pagination').querySelectorAll('.img_block').length;
  var arr_div = document.getElementById('pagination').querySelectorAll('.img_block');
  while (counter > i) {
    getlike_load(arr_div[i].id);
    i++;
  }
}

function getlike_load(id) {
    var xhr = new XMLHttpRequest();
    var data = new FormData();

    data.append('get_quantity_all', id);
    xhr.open('POST','../config/social.php', true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          document.getElementById(id).childNodes[1].childNodes[0].childNodes[1].innerHTML = xhr.responseText;
      }
    };
    xhr.send(data);
}

function comments() {
  document.getElementsByClassName('profile_background')[0].style.display = 'block';
  document.getElementsByClassName('comments')[0].style.display = 'flex';

  remove_previous_comments();
  get_img_and_user();
  get_comment();
}

function get_img_and_user() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();
  var id = event.target.parentNode.parentNode.parentNode.id;
  comment_img_id = id;

  data.append('get_comment_img', id);
  xhr.open('POST','../config/load_img.php', true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var obj = JSON.parse(xhr.responseText);
      document.getElementById('comment_img').src = "photos/" + obj[1];
      document.getElementById('comment_user').innerHTML = "Creat by: " + obj[0];
    }
  };
  xhr.send(data);
}

function remove_previous_comments() {
  var remove_div = document.getElementById('comment').getElementsByClassName('comment');
  var comments = document.getElementsByClassName('comment');
  var i = 0;

  while (i < comments.length)
  {
    remove_div[i].parentNode.removeChild(remove_div[i]);
  }
}

function get_comment() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();

  data.append('all_comment_by_img_id', comment_img_id);
  xhr.open('POST','../config/comment.php', true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var obj = JSON.parse(xhr.responseText);
      var lenght = parseInt(obj.length);
      var start = document.getElementById('comment');
      var i = 0;

      while (i < lenght) {
        var commentDiv = creat_comment_div(document.createElement('div'));
        var newDiv = creat_div(document.createElement('div'));
        var userName = creat_userName(document.createElement('p'));
        var date = creat_date(document.createElement('p'));
        var textDiv = creat_text_div(document.createElement('div'));
        var userText = creat_user_text(document.createElement('p'));

        start.appendChild(commentDiv);
        commentDiv.appendChild(newDiv);
        newDiv.appendChild(userName);
        newDiv.appendChild(date);
        commentDiv.appendChild(textDiv);
        textDiv.appendChild(userText);
        i++;
      }

      function creat_comment_div(commentDiv)
      {
        commentDiv.className = 'comment';
        return (commentDiv);
      }

      function creat_div(newDiv)
      {
        newDiv.className = 'comments_user_data';
        return (newDiv);
      }
      function creat_text_div(textDiv)
      {
        textDiv.className = 'comments_text_data';
        return (textDiv);
      }
      function creat_userName(userName)
      {
        userName.innerHTML = 'User name: ' + obj[i][2];
        userName.className = 'comments_user_name';
        return (userName);
      }
      function creat_date(date)
      {
        date.innerHTML = 'Create date: ' + obj[i][3];
        date.className = 'comments_creat_date';
        return (date);
      }
      function creat_user_text(userText)
      {
        userText.innerHTML = 'Comment : ' + obj[i][1];
        userText.className = 'comments_creat_date';
        return (userText);
      }
    }
  };
  xhr.send(data);
}

function close_comments() {
  document.getElementsByClassName('profile_background')[0].style.display = 'none';
  document.getElementsByClassName('comments')[0].style.display = 'none';
  remove_previous_comments();
}

var comment = document.getElementById('add_comment');
comment.addEventListener('submit', function(comment) {
  comment.preventDefault();
  put_comments();
});

function put_comments() {
  var xhr = new XMLHttpRequest();
  var data = new FormData();
  var text = document.getElementById("comment_text").value;

  data.append('get_comment', text);
  data.append('img_id', comment_img_id); /*global var set in get_img_and_user()*/
  xhr.open('POST','../config/comment.php', true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (xhr.responseText == 'add_comment')
      {
        document.getElementsByClassName('js_comment_add')[0].style.display = 'block';
        document.getElementsByClassName('comment_form')[0].style.display = 'none';
        setTimeout(function(){
          document.getElementsByClassName('js_comment_add')[0].style.display = 'none';
          document.getElementsByClassName('comment_form')[0].style.display = 'flex';
        }, 3000);
        close_comments();
      }
    }
  };
  xhr.send(data);
}
