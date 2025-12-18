import {
  gameData,
  defaultData,
  defaultLevel,
  lastLevel,
  gameScreen,
  confirmBtn,
  confirmZone,
  playerIcon,
  enemyLines,
  projectiles,
} from "../variables.js";
import { loadMainMenu } from "./main-menu.js";
import { loadLevel } from "../engine/levels.js";
import { disableEnemyShooting } from "../mechanics/enemy-shooting.js";
import { disableMovement } from "../mechanics/player-movement.js";
import { disableShooting } from "../mechanics/player-shooting.js";
import { removeTimer, pauseTimer } from "../engine/timer.js";
import { resumeGame } from "./pause.js";
import { pauseCutscene } from "../cutscenes/write-cutscenes.js";

// Fonction pour redémarrer le jeu depuis le menu principal
// ---- Réinitialise gameData et defaultLevel à leur valeur de départ et replace le joueur au centre de l'écran de jeu, puis ouvre le menu principal
function resetGame() {
  confirmBtn.removeEventListener("click", resetGame);
  confirmZone.classList.add("is-hidden");

  Object.assign(gameData, defaultData);

  console.log(gameData);
  Object.assign(lastLevel, defaultLevel);
  resetSteps();

  gameScreen.classList.add("is-hidden");

  // location.reload(true);
  loadMainMenu();
}

function resetSteps() {
  playerIcon.style.removeProperty("left");
  enemyLines.innerHTML = "";
  projectiles.innerHTML = "";

  disableEnemyShooting();
  disableMovement();
  disableShooting();
  pauseTimer();
  removeTimer();
  pauseCutscene();
}

// Fonction pour recommencer le niveau en cours
// ---- Réinitialise les données de gameData au score, vies et powerups enregistrés à la fin du niveau précédent, puis recharge le niveau actuel
function restartLevel() {
  confirmBtn.removeEventListener("click", restartLevel);
  confirmZone.classList.add("is-hidden");

  gameData.score = lastLevel.score;
  gameData.lives = lastLevel.lives;
  gameData.powerups = lastLevel.powerups;

  resetSteps();
  resumeGame();

  loadLevel();
}

export { resetGame, restartLevel };
