import { loadMainMenu } from "../menus/main-menu.js";
import { confirmReset, confirmRestart } from "../menus/confirm.js";
import { toggleMusic, toggleEffects } from "../menus/toggle-music.js";
import {
  restartBtn,
  resetBtn,
  musicBtn,
  effectBtn,
  toCutscene,
  rulesBtn,
} from "../variables.js";
import { movePlayer } from "../animations/player-movement.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { displayRules } from "../menus/rules.js";

// Gestion du jeu (déplacement des collègues et du joueur)

// Initialisation du jeu
function init() {
  setEventListeners();
  loadMainMenu();
  movePlayer();
  toggleMusic();
}

// Création des event listeners qui seront toujours activés
function setEventListeners() {
  restartBtn.addEventListener("click", confirmRestart);
  resetBtn.addEventListener("click", confirmReset);
  musicBtn.addEventListener("click", toggleMusic);
  effectBtn.addEventListener("click", toggleEffects);
  toCutscene.addEventListener("click", selectCutscene);
  rulesBtn.addEventListener("click", displayRules);
}

init();
