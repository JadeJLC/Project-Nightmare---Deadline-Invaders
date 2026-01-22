import { changeMusic } from "../audio/music.js";
import {
  disableShooting,
  enableShooting,
} from "../mechanics/player-shooting.js";
import {
  createCarousel,
  startCarousel,
  destroyCarousel,
} from "../enemies/enemies.js";
import {
  levelData,
  allLevelData,
  gameData,
  gameState,
  typeZone,
  enemyLines,
  playerIcon,
  endLvl,
  toCutscene,
} from "../variables.js";
import {
  disableEnemyShooting,
  enableEnemyShooting,
  resumeEnemyShots,
} from "../mechanics/enemy-shooting.js";
import {
  disableMovement,
  enableMovement,
} from "../mechanics/player-movement.js";
import {
  updateProgressBar,
  initProgressDisplay,
} from "../scores/progress-bar.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { resetGame } from "../menus/reset.js";
import { displayTimer, pauseTimer, removeTimer, startTimer } from "./timer.js";
import {
  disablePowerUps,
  enablePowerUps,
} from "../powerups/activate-powerups.js";
import { displayPowerUps } from "../powerups/display-powerups.js";
import { displayScores, addScoreToScoreboard } from "../scores/scoreboard.js";
import { resumePowerUpTimer } from "../powerups/powerup-timer.js";

function loadLevel() {
  gameData.currentMusic = `level${gameData.currentLevel}`;
  console.log("Chargement du niveau", gameData.currentLevel);

  let levelNum = document.getElementById("level-num");
  if (levelNum) levelNum.textContent = `Niveau ${gameData.currentLevel}`;

  // Configurer le niveau
  Object.assign(levelData, allLevelData[gameData.currentLevel]);
  HUD.classList.remove("is-hidden");
  changeMusic();

  // Attendre que la cutscene soit chargée
  const checkCutscene = setInterval(() => {
    if (gameData.loadedCutscene) {
      clearInterval(checkCutscene);
      initLevel();
    }
  }, 200);
}

function initLevel() {
  // Réinitialiser les scores
  gameData.badScore = 0;
  gameData.goodScore = 0;
  gameData.countPoint = true;

  // Créer le carousel
  createCarousel();

  // Activer les systèmes de jeu
  enablePowerUps();
  displayPowerUps();
  initProgressDisplay();
  updateProgressBar();

  // Activer les contrôles et tirs
  enableShooting();
  enableEnemyShooting();
  enableMovement();
  resumeEnemyShots();

  // Démarrer le timer
  setInterval(displayTimer, 10);
  startTimer();
  resumePowerUpTimer();

  // Démarrer la boucle du carousel (mode standard)
  startCarousel();
}

function finishLevel() {
  if (gameData.gameMode === "Endless") {
    return;
  }

  // Désactiver tous les systèmes
  disablePowerUps();
  disableShooting();
  disableMovement();
  disableEnemyShooting();
  pauseTimer();
  removeTimer();

  // Détruire le carousel
  destroyCarousel();

  // Réinitialisation de l'interface
  typeZone.textContent = "";
  enemyLines.innerHTML = "";
  playerIcon.style.removeProperty("left");

  const projectiles = document.getElementById("projectiles");
  projectiles.innerHTML = "";

  let index = gameData.currentLevel - 1;
  gameData.loadedCutscene = false;
  gameData.countPoint = false;

  HUD.classList.add("is-hidden");

  // Afficher l'écran de fin de niveau
  endLvl.classList.remove("is-hidden");
  if (gameData.goodScore > 50) {
    endLvl.firstElementChild.innerHTML = `Félicitations ! Vous avez terminé le niveau ${gameData.currentLevel} avec un score de ${gameData.levelscores[index]}% !`;
  } else {
    endLvl.firstElementChild.innerHTML = `Vous avez terminé le niveau ${gameData.currentLevel} avec un score de ${gameData.levelscores[index]}%.`;
  }

  document.getElementById("launch-cutscene").focus();
}

function endGame() {
  endLvl.classList.remove("is-hidden");

  if (gameData.lives === 0) {
    endLvl.firstElementChild.innerHTML = `Votre histoire dans Project Nightmare : Deadline Invaders s'arrête ici.<br/><br/>
    Malheureusement, ${gameData.relouName} a eu raison de vous et de votre équipe.<br/><br/>
    Mais il n'est pas trop tard pour réctifier le tir... dans une nouvelle partie.`;
  } else {
    endLvl.firstElementChild.innerHTML = `Félicitations ! Vous avez terminé Project Nightmare : Deadline Invaders ! <br/><br/>
    Il semble que ${gameData.relouName} ne compte pas en rester là.<br/><br/>
    Peut-être vous retrouverez-vous bientôt...`;
  }

  toCutscene.removeEventListener("click", selectCutscene);
  toCutscene.addEventListener("click", scoreScreen);
  toCutscene.textContent = "Continuer";
  toCutscene.focus();
}

let scoreScreenLock = false;

async function scoreScreen() {
  if (scoreScreenLock) return;
  scoreScreenLock = true;

  gameState.freezeInit = true;
  gameState.screen = "scoreboard";

  await addScoreToScoreboard();

  console.log(
    "Score enregistré, percentile :",
    gameState.lastAddedScore.percentile,
  );

  endLvl.classList.add("is-hidden");
  displayScores(1, true);

  toCutscene.removeEventListener("click", scoreScreen);
  toCutscene.addEventListener("click", finalScreen);
  toCutscene.textContent = "Retour au menu principal";
  toCutscene.focus();

  scoreScreenLock = false;

  // paramètres ouverts par défaut ?
  //conflits api création fichiers json et gitignore

  //vrai serveur personalisé api
  //changer date rajouter une heure, heure d'hiver
}

function finalScreen() {
  toCutscene.removeEventListener("click", finalScreen);
  toCutscene.addEventListener("click", selectCutscene);
  toCutscene.textContent = "Continuer";

  gameState.screen = "menu";
  gameState.freezeInit = false;

  resetGame();
}

export { loadLevel, finishLevel, endGame, scoreScreen };
