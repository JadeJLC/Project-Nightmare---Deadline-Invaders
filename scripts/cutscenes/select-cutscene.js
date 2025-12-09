import { changeMusic } from "../audio/music.js";
import { gameData, lastLevel, sceneZone, endLvl } from "../variables.js";
import {
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
  cutsceneFailedLevel,
  cutsceneIntro,
} from "./play-cutscenes.js";
import { loseLife } from "../mechanics/life.js";
import { addScoreToScoreboard } from "../scores/scoreboard.js";

// Gestion des cinématiques
function startCutscenes() {
  endLvl.classList.add("is-hidden");
  sceneZone.classList.remove("is-hidden");

  gameData.score =
    gameData.levelscores[0] + gameData.levelscores[1] + gameData.levelscores[2];

  if (gameData.lives === 0) {
    addScoreToScoreboard();
    badEnding();
    return;
  }

  if (gameData.badScore > gameData.goodScore) {
    loseLife();
    failedLevel();
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
      addScoreToScoreboard();
      if (gameData.score === 300) {
        perfectEnding();
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
  console.log("Fin du jeu.");
  // ---- Cinématique de fin simple
}

function perfectEnding() {
  // ---- Cinématique de fin après un score de 100% sur chaque niveau
}

export { starterScene, startCutscenes };
