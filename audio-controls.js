var audio = document.getElementById("my-audio");
var playBtn = document.getElementById("play-btn");
var pauseBtn = document.getElementById("pause-btn");
var volumeUpBtn = document.getElementById("volume-up-btn");
var volumeDownBtn = document.getElementById("volume-down-btn");

playBtn.addEventListener("click", function() {
  audio.play();
});

pauseBtn.addEventListener("click", function() {
  audio.pause();
});

volumeUpBtn.addEventListener("click", function() {
  audio.volume += 0.1;
});

volumeDownBtn.addEventListener("click", function() {
  audio.volume -= 0.1;
});

var time = 0;

window.addEventListener("beforeunload", function() {
  time = audio.currentTime;
});

window.addEventListener("load", function() {
  if (time > 0) {
    audio.currentTime = time;
  }
});
