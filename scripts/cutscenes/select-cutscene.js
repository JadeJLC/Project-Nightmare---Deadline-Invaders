import { changeMusic } from "../audio/music.js";
import { gameData, lastLevel, sceneZone } from "../variables.js";
import { cutsceneIntro } from "./play-cutscenes.js";

// Gestion des cinématiques
function startCutscenes() {
  gameData.score =
    gameData.levelscores[0] + gameData.levelscores[1] + gameData.levelscores[2];

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
      } else if (gameData.levelscores[gameData.currentLevel - 1]) {
        failedLevel();
      } else {
        goodEnding();
      }
      break;
  }
}

function starterScene() {
  // ---- Lancer la cinématique de départ
  sceneZone.classList.remove("is-hidden");
  gameData.currentMusic = "intro";
  changeMusic();

  cutsceneIntro();

  gameData.currentLevel = 1;
}

function firstLevelEnd() {
  // ---- Lancer la cinématique de fin du niveau 1

  gameData.currentLevel = 2;

  lastLevel.nb = 1;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;
}

function secondLevelEnd() {
  // ---- Lancer la cinématique de fin du niveau 2

  gameData.currentLevel = 3;

  lastLevel.nb = 2;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;
}

function failedLevel() {
  // --- Cinématique quand on échoue à un niveau
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

export { starterScene };
