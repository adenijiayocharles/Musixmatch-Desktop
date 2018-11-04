let mainPlayButton = document.querySelector("#play");
let playButtons = document.querySelectorAll("i.play");
let musicPlayer = document.querySelector("#audio");


function play(audio){
    musicPlayer.src = audio;    
    let playButtonState = mainPlayButton.getAttribute("data-mode");
    if (playButtonState == "play") {
        mainPlayButton.setAttribute("class", "fa fa-pause-circle fa-3x");
        mainPlayButton.setAttribute("data-mode", "pause");
        musicPlayer.play();
    } else if (playButtonState == "pause") {
        mainPlayButton.setAttribute("class", "fa fa-play-circle fa-3x");
        mainPlayButton.setAttribute("data-mode", "play");
        musicPlayer.pause();
    }    
}

//songs progress
musicPlayer.addEventListener("timeupdate", updateProgressBar);
function updateProgressBar(){
    let progressBarRed = document.querySelector("#progress");
    let progressBarMarker = document.querySelector("#marker");
    let value = 0;
    if(musicPlayer.duration == 'Infinity'){
        value = 100;
    }else if(musicPlayer.currentTime > 0){
        value = Math.floor((100 / musicPlayer.duration) * musicPlayer.currentTime);
    }

    progressBarRed.style.width = value + "%";
    progressBarMarker.style.left = value + "%";
    
    let totalAudioDuration = formatTime(musicPlayer.duration);
    let audioCurrentTime = formatTime(musicPlayer.currentTime);

    document.querySelector("#end").textContent = totalAudioDuration;
    document.querySelector("#start").textContent = audioCurrentTime;

    if(totalAudioDuration == audioCurrentTime){
        mainPlayButton.setAttribute("class", "fa fa-play-circle fa-3x");
        mainPlayButton.setAttribute("data-mode", "play"); 
        progressBarRed.style.width = "0%";
        progressBarMarker.style.left = "0%";               
    }
}

function formatTime(time) { //Change time format
    minutes = Math.floor(time / 60);
    minutes = (minutes >= 10) ? minutes : "" + minutes;
    seconds = Math.floor(time % 60);
    seconds = (time >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}



playButtons.forEach((playButton) => {
    playButton.addEventListener("click", (e) => {
        let target = e.target;
        let audio = target.getAttribute("data-audio");
        play(audio);
    });
});
