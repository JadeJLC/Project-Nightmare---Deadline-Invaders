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
} from "../variables.js";
import { loadMainMenu } from "./main-menu.js";
import { loadLevel } from "../engine/levels.js";
import { disableEnemyShooting } from "../mechanics/enemy-shooting.js";
import { disableMovement } from "../animations/player-movement.js";
import { disableShooting } from "../mechanics/shooting.js";
import { removeTimer, pauseTimer } from "../engine/timer.js";

// Fonction pour redémarrer le jeu depuis le menu principal
// ---- Réinitialise gameData et defaultLevel à leur valeur de départ et replace le joueur au centre de l'écran de jeu, puis ouvre le menu principal
function resetGame() {
  confirmBtn.removeEventListener("click", resetGame);
  confirmZone.classList.add("is-hidden");

  Object.assign(gameData, defaultData);
  Object.assign(lastLevel, defaultLevel);
  playerIcon.style.removeProperty("left");
  enemyLines.innerHTML = "";

  gameScreen.classList.add("is-hidden");

  disableEnemyShooting();
  disableMovement();
  disableShooting();
  pauseTimer();
  removeTimer();

  loadMainMenu();
}

// Fonction pour recommencer le niveau en cours
// ---- Réinitialise les données de gameData au score, vies et powerups enregistrés à la fin du niveau précédent, puis recharge le niveau actuel
function restartLevel() {
  confirmBtn.removeEventListener("click", restartLevel);
  confirmZone.classList.add("is-hidden");

  gameData.score = lastLevel.score;
  gameData.lives = lastLevel.lives;
  gameData.powerups = lastLevel.powerups;

  enemyLines.innerHTML = "";
  disableEnemyShooting();
  disableMovement();
  disableShooting();
  pauseTimer();
  removeTimer();

  loadLevel();
}

export { resetGame, restartLevel };
