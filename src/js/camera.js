var video = document.querySelector("#videoElement");
var context = canvas.getContext('2d');
var images = document.getElementsByClassName('images')[0];
var localstream;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

document.getElementById("cameraOn").addEventListener("click", function() {
  if (navigator.getUserMedia) {
      if (document.getElementById('videoElement').style.display == 'none')
      {
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('videoElement').style.display = 'block';
        document.getElementById('canvas').style.display = 'none';
      }
      navigator.getUserMedia({video: true}, handleVideo, videoError);
      document.getElementById('makePhoto').style.display = 'block';
      document.getElementById('savePhoto').style.display = 'block';
      document.getElementById('cameraOff').style.display = 'block';
      document.getElementById('downloadPhoto').style.display = 'none';
      document.getElementById('remove').style.display = 'block';
      document.getElementById("cameraOn").innerHTML = "Clear img";
  }
});

function handleVideo(stream) {
    localstream = stream;
    video.srcObject = stream;
}

document.getElementById("cameraOff").addEventListener("click", cameraOff);

function videoError(e) {
    // do something
}

function cameraOff() {
  video.pause();
  video.src = "";
  document.getElementById('makePhoto').style.display = 'none';
  document.getElementById('savePhoto').style.display = 'none';
  document.getElementById('cameraOff').style.display = 'none';
  document.getElementById('remove').style.display = 'none';
  document.getElementById("cameraOn").innerHTML = "Camera on";
  localstream.getTracks()[0].stop();
}

// Trigger photo take
document.getElementById("makePhoto").addEventListener("click", makePhoto);

function makePhoto(e) {
  var canvas = document.getElementById('canvas');
  var video = document.getElementById('videoElement');
  var get_img = document.getElementById("video_container").querySelectorAll(".img_style");
  var get_img_lenght = document.getElementById("video_container").querySelectorAll(".img_style").length;
  var parentPos = document.getElementById('videoElement').getBoundingClientRect();
  var i = 0;

  document.getElementById('videoElement').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
  document.getElementById('downloadPhoto').style.display = 'block';

  width = video.videoWidth;
  height = video.videoHeight;
  canvas.height = height;
  canvas.width = width;
  context.drawImage(video, 0, 0, width, height);
  while (get_img_lenght > i)
  {
    width = get_img[i].width;
    height = get_img[i].height;

    var  childrenPos = get_img[i].getBoundingClientRect(),
        relativePos = {};

    relativePos.top = childrenPos.top - parentPos.top,
    relativePos.left = childrenPos.left - parentPos.left;
    context.drawImage(get_img[i], relativePos.left, relativePos.top, width, height);
    i++;
  }
  video.pause();
  video.src = "";
  localstream.getTracks()[0].stop();
  removeElementsByClass('remove');
}

function removeElementsByClass(className)
{
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

images.onclick = function(event) {
  var target = event.target;
  if (validations(target) == 1)
  {
    var copy = target.cloneNode(true);
    //target.classList.add("active_img");
    copy.classList.add("remove");
    set_position();
    document.getElementById("video_container").appendChild(copy);
    move_image(copy);
  }

  function set_position()
  {
    copy.style.position = 'absolute';
    copy.style.top = '50px';
    copy.style.left = '50px';
  }

  function validations(target)
  {
    var tmp = document.getElementById('videoElement');
    if (target.className == 'img_style' && target.tagName == 'IMG')
    {
        return (1);
    }
    return (0);
  }
}

function move_image(image)
{
  var mousePosition;
  var offset = [0,0];
  var isDown = false;


  image.addEventListener('mousedown', function(e) {
      isDown = true;
      offset = [
          image.offsetLeft - e.clientX,
          image.offsetTop - e.clientY
      ];
  }, true);

  document.addEventListener('mouseup', function() {
      isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) {
          mousePosition = {

              x : event.clientX,
              y : event.clientY

          };
          image.style.left = (mousePosition.x + offset[0]) + 'px';
          image.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
  }, true);
}


document.getElementById("remove").addEventListener("click", remove_image);

function remove_image(){
  var elements = document.getElementsByClassName('remove');
  var get_img_lenght = document.getElementById("video_container").querySelectorAll(".img_style").length;
  if (get_img_lenght > 0)
    elements[get_img_lenght - 1].parentNode.removeChild(elements[get_img_lenght - 1]);
}


document.getElementById("increase").addEventListener("click", increase_image);

function increase_image(){
  var elements = document.getElementsByClassName('remove');
  var get_img_lenght = document.getElementById("video_container").querySelectorAll(".img_style").length;
  var target = elements[get_img_lenght - 1];
  var w = target.offsetWidth;

  if (get_img_lenght > 0)
  {
    if (w < 320)
        w = w + 5;
    target.style.height = w + "px";
    target.style.width = w + "px";
  }
}

document.getElementById("decrease").addEventListener("click", decrease_image);

function decrease_image(){
  var elements = document.getElementsByClassName('remove');
  var get_img_lenght = document.getElementById("video_container").querySelectorAll(".img_style").length;
  var target = elements[get_img_lenght - 1];
  var w = target.offsetWidth;

  if (get_img_lenght > 0)
  {
    if (w < 320 && w > 40)
        w = w - 5;
    target.style.height = w + "px";
    target.style.width = w + "px";
  }
}

document.getElementById("downloadPhoto").addEventListener("click", download_photo);

function download_photo() {
  var download = document.getElementById("downloadPhoto");
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

  download.setAttribute("href", image);
}

document.getElementById("savePhoto").addEventListener("click", save_photo);

function save_photo() {
  var c = document.getElementById("canvas");
  var img = c.toDataURL("image/png");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var data = "img=" + img;
  xhr.send(data);
  console.log(img);
}
