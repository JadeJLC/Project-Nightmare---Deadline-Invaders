import {
  gameData,
  gameOptions,
  musicBtn,
  effectBtn,
  tutoBtn,
} from "../variables.js";
import { stopMusic, playMusic } from "../audio/music.js";

function toggleMusic() {
  if (!gameOptions.musicOn) {
    console.log("Lecture de la musique : ", gameData.currentMusic);
    musicBtn.textContent = "🎵 / Couper la musique";
    gameOptions.musicOn = true;
    playMusic(gameData.currentMusic);
  } else {
    console.log("Arrêt de la musique");
    musicBtn.textContent = "🔇 / Activer la musique";
    gameOptions.musicOn = false;
    stopMusic();
  }
}

function toggleEffects() {
  if (!gameOptions.soundEffects) {
    effectBtn.textContent = "🔉 / Désactiver les effets sonores";
    gameOptions.soundEffects = true;
  } else {
    console.log("Arrêt de la musique");
    effectBtn.textContent = "🔇 / Activer les effets sonores";
    gameOptions.soundEffects = false;
  }
}

function toggleTutorials() {
  if (!gameOptions.tutos) {
    tutoBtn.textContent = "🤝 / Désactiver les didacticiels en jeu";
    gameOptions.tutos = true;
  } else {
    console.log("Arrêt de la musique");
    tutoBtn.textContent = "🚫 / Activer les didacticiels en jeu";
    gameOptions.tutos = false;
  }
}

export { toggleMusic, toggleEffects, toggleTutorials };
