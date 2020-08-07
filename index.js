const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const likeBtn = document.getElementById('like');
const redoBtn = document.getElementById('redo');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const time = document.getElementById('time')

// Song titles
const songs = ['happyrock', 'jazzyfrenchy', 'retrosoul'];
const happyrock = '#ffc7c7'
const jazzyfrenchy = '#6ebfb5'
const retrosoul = '#93b5e1'

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
    if (title.innerText === "happyrock") {
        document.body.style.backgroundColor = happyrock;
    } else if (title.innerText === "jazzyfrenchy") {
        document.body.style.backgroundColor = jazzyfrenchy;
    } else {
        document.body.style.backgroundColor = retrosoul;
    }
}


// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    var minutes = Math.floor(progressPercent / 60);
    var seconds = Math.floor(progressPercent - (minutes * 60));
    if (seconds <= 9) {
        time.innerText = minutes + ':0' + seconds;
    } else if (seconds > 9) {
        time.innerText = minutes + ':' + seconds;
    } else {
        time.innerText = '0:00';
    }
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Like song
function likeSong() {
    document.getElementById('like-icon').classList.toggle('fas');
}

// Repeat song
function repeatSong() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Like song
likeBtn.addEventListener('click', likeSong)

// Repeat song
redoBtn.addEventListener('click', repeatSong)

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
