import { musicBox } from "../variables.js";

function selectMusic(musicName) {
  return `../musiques/${musicName}.mp3`;
}

function playMusic(musicName) {
  const musicPath = selectMusic(musicName);

  musicBox.src = musicPath;
  musicBox.play().catch((err) => {
    if (err.name !== "AbortError") {
      console.error("Erreur à la lecture de la musique :", err);
    }
  });
}

function stopMusic() {
  musicBox.pause();
  musicBox.currentTime = 0;
}

function changeMusic(newMusic) {
  stopMusic();
  playMusic(newMusic);
}

export { selectMusic, changeMusic, playMusic, stopMusic };
