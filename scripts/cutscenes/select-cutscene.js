import { changeMusic } from "../audio/music.js";
import { gameData, lastLevel, sceneZone, endLvl } from "../variables.js";
import {
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
  cutsceneFailedLevel,
  cutsceneIntro,
} from "./play-cutscenes.js";

// Gestion des cinématiques
function startCutscenes() {
  endLvl.classList.add("is-hidden");
  sceneZone.classList.remove("is-hidden");

  gameData.score =
    gameData.levelscores[0] + gameData.levelscores[1] + gameData.levelscores[2];

  let index = gameData.currentLevel - 1;

  if (gameData.lives === 0) {
    badEnding();
    return;
  }

  switch (gameData.currentLevel) {
    case 0:
      starterScene();
      break;
    case 1:
      firstLevelEnd();
      break;
    case 2:
      secondLevelEnd();
      break;
    case 3:
      if (gameData.score === 300) {
        perfectEnding();
      } else if (gameData.levelscores[index] < 50) {
        gameData.lives -= 1;
        failedLevel();
      } else {
        goodEnding();
      }
      break;
  }
}

function starterScene() {
  gameData.currentMusic = "intro";
  changeMusic();

  cutsceneIntro();

  gameData.currentLevel = 1;
}

function firstLevelEnd() {
  gameData.currentMusic = "intro";
  changeMusic();
  // ---- Lancer la cinématique de fin du niveau 1

  gameData.currentLevel = 2;

  lastLevel.nb = 1;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;

  cutsceneEndFirstLevel();
}

function secondLevelEnd() {
  gameData.currentMusic = "intro";
  changeMusic();
  // ---- Lancer la cinématique de fin du niveau 2

  gameData.currentLevel = 3;

  lastLevel.nb = 2;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;

  cutsceneEndSecondLevel();
}

function failedLevel() {
  // --- Cinématique quand on échoue à un niveau

  cutsceneFailedLevel();
}

function badEnding() {
  // ---- Cinématique quand on n'a plus de vies
}

function goodEnding() {
  // ---- Cinématique de fin simple
}

function perfectEnding() {
  // ---- Cinématique de fin après un score de 100% sur chaque niveau
}

export { starterScene, startCutscenes };
