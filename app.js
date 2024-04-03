const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const reloadBtn = document.getElementById("reload");
const shuffleBtn = document.getElementById("shuffle");
const audio = document.getElementById("song");
const progress = document.querySelector(".progress");
const songTitle = document.querySelector(".song-title");
const albumCover = document.querySelector(".album-cover");

const songs = [
  "Evarevaro",
  "Nijame Ne Chebuthunna",
  "Oh My Baby",
  "Ticket Eh Konakunda",
];

let songIndex = 2;

const loadSong = (song) => {
  console.log(song);
  songTitle.innerText = song;
  audio.src = `audio/${song}.mp3`;
  albumCover.src = `thumbnails/${song}.jpg`;
};

loadSong(songs[songIndex]);

const playSong = () => {
  audio
    .play()
    .then(() => {
      playBtn.classList.add("fa-pause");
      playBtn.classList.remove("fa-play");
    })
    .catch((err) => {
      console.log(`Error : ${err}`);
    });
};

const pauseSong = () => {
  playBtn.classList.add("fa-play");
  playBtn.classList.remove("fa-pause");
  audio.pause();
};

playBtn.addEventListener("click", () => {
  const isPlaying = playBtn.classList.contains("fa-play");
  if (isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});
audio.addEventListener("timeupdate", () => {
  progress.value = Math.floor(audio.currentTime);
});

reloadBtn.addEventListener("click", () => {
  progress.value = 0;
  audio.currentTime = 0;
  pauseSong();
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
  playSong();
});

const playPrevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};
const playNextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const shuffleSong = () => {
  songIndex = Math.floor(Math.random() * songs.length);
  loadSong(songs[songIndex]);
  playSong();
};
prevBtn.addEventListener("click", playPrevSong);
nextBtn.addEventListener("click", playNextSong);
shuffleBtn.addEventListener("click", shuffleSong);
