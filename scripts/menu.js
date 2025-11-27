import { stopMusic, playMusic } from "./audio.js";
import { currentEvent } from "./variables";

// Gestion du menu pause
let lives = 3;
let isMusicOn = true;
const menu = document.getElementById("pause-menu");

function pauseMenu() {
  menu.classList.remove("is-hidden");
  // ---- Ouvre le menu et met le jeu en pause
}

function resumeGame() {
  menu.classList.add("is-hidden");
  // ---- Ferme le menu et relance le jeu
}

function restartLevel() {
  // ---- Fonction pour recommencer le niveau actuel
  // ---- Il ne faut pas perdre la progession sur les niveaux précédents !
}

function toggleMusic() {
  if (isMusicOn) {
    stopMusic();
    isMusicOn = false;
  } else {
    playMusic(currentEvent);
    isMusicOn = true;
  }
}
