import { changeMusic } from "../audio/music.js";
import { disableShooting, enableShooting } from "../mechanics/shooting.js";
import { newCarousel, enemyLoop } from "../enemies/enemies.js";
import {
  levelData,
  allLevelData,
  gameData,
  typeZone,
  enemyLines,
  playerIcon,
  endLvl,
  toCutscene,
} from "../variables.js";
import {
  disableEnemyShooting,
  enableEnemyShooting,
} from "../mechanics/enemy-shooting.js";
import {
  disableMovement,
  enableMovement,
} from "../animations/player-movement.js";
import { updateProgressBar } from "../scores/progress-bar.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { loadMainMenu } from "../menus/main-menu.js";
import { displayTimer, pauseTimer, removeTimer, startTimer } from "./timer.js";

function loadLevel() {
  gameData.currentMusic = `level${gameData.currentLevel}`;
  console.log("Chargement du niveau", gameData.currentLevel);

  let levelNum = document.getElementById("level-num");

  if (levelNum) levelNum.textContent = `Niveau ${gameData.currentLevel}`;

  Object.assign(levelData, allLevelData[gameData.currentLevel]);

  HUD.classList.remove("is-hidden");
  changeMusic();

  console.log("Création des ennemis");
  const checkCutscene = setInterval(() => {
    if (gameData.loadedCutscene) {
      clearInterval(checkCutscene);
      const carousel = newCarousel();
      enemyLoop(carousel);
    }
  }, 200);

  enableShooting();
  enableEnemyShooting();
  enableMovement();
  gameData.badScore = 0;
  gameData.goodScore = 0;
  gameData.countPoint = true;

  updateProgressBar();
  setInterval(displayTimer, 10);
  startTimer();
  console.log("Niveau chargé");
}

function finishLevel() {
  disableShooting();
  disableMovement();
  disableEnemyShooting();
  pauseTimer();
  removeTimer();

  // Réinitialisation de la zone de jeu
  typeZone.textContent = "";
  enemyLines.innerHTML = "";
  playerIcon.style.removeProperty("left");

  const projectiles = document.getElementById("projectiles");

  let index = gameData.currentLevel - 1;

  gameData.loadedCutscene = false;

  console.log(gameData);
  HUD.classList.add("is-hidden");
  console.log("Niveau terminé. Chargement de la cinématique.");
  projectiles.innerHTML = "";

  endLvl.classList.remove("is-hidden");
  gameData.countPoint = false;
  if (gameData.goodScore > 50) {
    endLvl.firstElementChild.innerHTML = `Félicitations ! Vous avez terminé le niveau ${gameData.currentLevel} avec un score de ${gameData.levelscores[index]}% !`;
  } else {
    endLvl.firstElementChild.innerHTML = `Vous avez terminé le niveau ${gameData.currentLevel} avec un score de ${gameData.levelscores[index]}%.`;
  }
}

function endGame() {
  console.log("Fin du jeu");
  endLvl.classList.remove("is-hidden");
  endLvl.firstElementChild.innerHTML = `Félicitations ! Vous avez terminé Project Nightmare : Deadline Invaders ! <br/><br/>
    Il semble que ${gameData.relouName} ne compte pas en rester là.<br/><br/>
    Peut-être le retrouverez-vous bientôt...`;

  toCutscene.removeEventListener("click", selectCutscene);

  toCutscene.addEventListener("click", thanksScreen);

  toCutscene.textContent = "Continuer";
}

function thanksScreen() {
  endLvl.firstElementChild.innerHTML = `Merci d'avoir joué !`;
  toCutscene.removeEventListener("click", thanksScreen);

  toCutscene.addEventListener("click", finalScreen);

  toCutscene.textContent = "Retour au menu principal";
}

function finalScreen() {
  endLvl.classList.add("is-hidden");
  toCutscene.textContent = "Continuer";
  toCutscene.removeEventListener("click", finalScreen);
  toCutscene.addEventListener("click", selectCutscene);
  loadMainMenu();
}

export { loadLevel, finishLevel, endGame };
