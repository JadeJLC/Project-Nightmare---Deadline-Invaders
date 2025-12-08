import { loadMainMenu } from "../menus/main-menu.js";
import { confirmReset, confirmRestart } from "../menus/confirm.js";
import { toggleMusic, toggleEffects } from "../menus/toggle-music.js";
import { restartBtn, resetBtn, musicBtn, effectBtn } from "../variables.js";
import { playMusic } from "../audio/music.js";
import { movePlayer } from "../animations/player-movement.js";

// Gestion du jeu (déplacement des collègues et du joueur)

// Initialisation du jeu
function init() {
  setEventListeners();
  loadMainMenu();
  movePlayer();
}

// Création des event listeners qui seront toujours activés
function setEventListeners() {
  restartBtn.addEventListener("click", confirmRestart);
  resetBtn.addEventListener("click", confirmReset);
  musicBtn.addEventListener("click", toggleMusic);
  effectBtn.addEventListener("click", toggleEffects);
}

init();
