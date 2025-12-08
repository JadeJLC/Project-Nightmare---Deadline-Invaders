import { gameData, gameOptions, musicBtn, effectBtn } from "../variables.js";
import { stopMusic, playMusic } from "../audio/music.js";

function toggleMusic() {
  let turnMusicOn = !gameOptions.musicOn;

  if (turnMusicOn) {
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
  let turnEffectsOn = !gameOptions.soundEffects;

  if (turnEffectsOn) {
    effectBtn.textContent = "🔉 / Désactiver les effets sonores";
    gameOptions.soundEffects = true;
  } else {
    console.log("Arrêt de la musique");
    effectBtn.textContent = "🔇 / Activer les effets sonores";
    gameOptions.soundEffects = false;
  }
}

export { toggleMusic, toggleEffects };
