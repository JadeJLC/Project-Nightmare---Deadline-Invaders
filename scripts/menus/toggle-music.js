import { gameData, musicBtn } from "../variables.js";
import { stopMusic, playMusic } from "../audio/music.js";

let currentMusic = "main-menu";
if (gameData.currentLevel !== 0)
  currentMusic = `level${gameData.currentLevel}.mp3`;

function toggleMusic() {
  let turnMusicOn = musicBtn.classList.toggle("music-on");

  if (turnMusicOn) {
    console.log("Lecture de la musique");
    musicBtn.textContent = "🎵 / Couper la musique";
    playMusic(currentMusic);
  } else {
    console.log("Arrêt de la musique");
    musicBtn.textContent = "🔇 / Activer la musique";
    stopMusic();
  }
}

export { toggleMusic };
