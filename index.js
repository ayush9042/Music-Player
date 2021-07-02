var audioPlayer = document.getElementById("audio-player");

var btnPlay = document.getElementById("btn-play");
var btnPause = document.getElementById("btn-pause");
var progressBar = document.getElementById("progress-bar")

btnPlay.addEventListener("click", function(){
  audioPlayer.play();
});

btnPause.addEventListener("click", function(){
  audioPlayer.pause();
});

// Adding width functionality to progress bar

audioPlayer.addEventListener("timeupdate", function(){
  var durationSoFar = audioPlayer.currentTime/audioPlayer.duration * 100 ;
  progressBar.style.width = durationSoFar + "%";
});

// Adding +10s and -10s feature to our audio player 

var btnForward = document.getElementById("btn-forward");

btnForward.addEventListener('click', function(){
  var updateAudio = audioPlayer.currentTime + 10;
  if(updateAudio > audioPlayer.duration){
    audioPlayer.currentTime = audioPlayer.duration;
  }else{
    audioPlayer.currentTime = updateAudio;
  }
});

var btnBackward= document.getElementById("btn-backward");

btnBackward.addEventListener('click', function(){
  var updateAudio = audioPlayer.currentTime - 10;
  if(updateAudio > audioPlayer.duration){
    audioPlayer.currentTime = 0;
  }else{
    audioPlayer.currentTime = updateAudio;
  }
});

// Adding speed feature to our audio player 

var playBackRatePoint25 = document.getElementById("btn-playbackrate-0.25"); 
var playBackRatePoint5 = document.getElementById("btn-playbackrate-0.5");
var playBackRateNormal = document.getElementById("btn-playbackrate-1");
var playBackRate1Point5 = document.getElementById("btn-playbackrate-1.5");
var playBackRatePoint2 = document.getElementById("btn-playbackrate-2");

playBackRatePoint25.addEventListener("click", function(){
  audioPlayer.playbackRate = 0.25;
});

playBackRatePoint5.addEventListener("click", function(){
  audioPlayer.playbackRate = 0.5;
});

playBackRateNormal.addEventListener("click", function(){
  audioPlayer.playbackRate = 1;
});

playBackRate1Point5.addEventListener("click", function(){
  audioPlayer.playbackRate = 1.5;
});

playBackRatePoint2.addEventListener("click", function(){
  audioPlayer.playbackRate = 2;
});

// Adding sounds to our audio player 

var btnVolInc = document.getElementById("btn-vol-inc");
var btnVolDec = document.getElementById("btn-vol-dec");
var playerVol = document.getElementById("player-vol");

// By default volume be 30%

playerVol.volume = 0.3;
playerVol.innerHTML = audioPlayer.volume * 100 + "%";

btnVolInc.addEventListener("click", function(){
  audioPlayer.volume += 0.1; 
  playerVol.innerHTML = audioPlayer.volume * 100 + "%";
})

btnVolDec.addEventListener("click", function(){
  audioPlayer.volume -= 0.1; 
  playerVol.innerHTML = audioPlayer.volume * 100 + "%";
});

// JQuery to fetch data from API 

$.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist", function(response){
  for(i=0; i<response.length; i++){
    renderAudioTrack(response[i]);
  }
});

function renderAudioTrack(data){
  // <article class="playlist-card">
  //       <img class="cover-img" src="https://m.media-amazon.com/images/I/81mNRm3F6KL._SS500_.jpg" />
  //       <div>
  //         <h3 class="track-title">Without You</h3>
  //         <p class="track-artist">Avicii</p>
  //       </div>
  //     </article>

  var playlistCard = $("<aticle>").addClass("playlist-card").attr("id", data.id);
  var thumbnail = $("<img>").addClass("cover-img").attr("src", data.albumCover);

  var contentWrapper = $("<div>");
  var title = $("<h3>").addClass("track-title").html(data.track);
  var artist = $("<p>").addClass("track-artist").html(data.artist);

  contentWrapper.append(title, artist);
  playlistCard.append(thumbnail, contentWrapper);
  $("#playlist-section").append(playlistCard);

  playlistCard.click(function(){
    var id = $(this).attr("id");
    $.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist/" + id , function(response){
      $("#render-left-thumbnail").attr("src", response.albumCover);
      $("#audio-track-title").html(response.track);
      $("#audio-track-artist").html(response.artist);
      $("#audio-source").attr("src", response.file);
      audioPlayer.load();
      audioPlayer.play();
    })
  })

}



