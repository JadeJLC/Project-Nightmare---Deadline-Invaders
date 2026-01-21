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
  gameData,
  gameState,
} from "../variables.js";
import { movePlayer } from "../mechanics/player-movement.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { displayRules } from "../menus/rules.js";
import { pauseMenu } from "../menus/pause.js";

// Gestion du jeu (déplacement des collègues et du joueur)

// Initialisation du jeu
function init() {
  if (gameState.hasInit || gameState.freezeInit) {
    console.log(
      "init() bloqué : freezeInit actif ou init() en cours d'utilisation",
      gameState.freezeInit,
      gameState.hasInit,
    );
    return;
  }
  gameState.hasInit = true;

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
  toCutscene.addEventListener("click", selectCutscene);
  rulesBtn.addEventListener("click", displayRules);

  document.addEventListener("keydown", pauseInit);
}

function pauseInit(e) {
  if (e.key === "p" && gameData.loadedCutscene) {
    pauseMenu("pause");
  }
}

init();
