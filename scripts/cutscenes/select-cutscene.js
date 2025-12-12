import { changeMusic } from "../audio/music.js";
import { gameData, lastLevel, sceneZone, endLvl } from "../variables.js";
import {
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
  cutsceneFailedLevel,
  cutsceneIntro,
  cutsceneEndThirdLevel,
} from "./text-cutscenes.js";
import { loseLife } from "../mechanics/life.js";
import { addScoreToScoreboard } from "../scores/scoreboard.js";
import { cutsceneDisplayCoworkers } from "./images-cutscenes.js";

// Gestion des cinématiques
function selectCutscene() {
  cutsceneDisplayCoworkers();
  endLvl.classList.add("is-hidden");
  sceneZone.classList.remove("is-hidden");

  gameData.score =
    gameData.levelscores[0] + gameData.levelscores[1] + gameData.levelscores[2];

  if (gameData.lives === 0) {
    addScoreToScoreboard();
    badEnding();
    return;
  }

  if (
    gameData.badScore > gameData.goodScore ||
    (gameData.badScore + gameData.goodScore < 100 && gameData.currentLevel != 0)
  ) {
    loseLife();
    failedLevel();
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
      goodEnding();
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
  gameData.currentMusic = "cutscene1";
  changeMusic();

  gameData.currentLevel = 2;

  lastLevel.nb = 1;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;

  cutsceneEndFirstLevel();
}

function secondLevelEnd() {
  gameData.currentMusic = "cutscene2";
  changeMusic();

  gameData.currentLevel = 3;

  lastLevel.nb = 2;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;

  cutsceneEndSecondLevel();
}

function failedLevel() {
  gameData.score = lastLevel.score;
  // --- Cinématique quand on échoue à un niveau

  cutsceneFailedLevel();
}

function badEnding() {
  // ---- Cinématique quand on n'a plus de vies
}

function goodEnding() {
  gameData.currentLevel = 4;
  gameData.currentMusic = "good-ending";
  changeMusic();

  lastLevel.nb = 3;
  lastLevel.powerups = gameData.powerups;
  lastLevel.score = gameData.score;
  lastLevel.lives = gameData.lives;

  addScoreToScoreboard();
  cutsceneEndThirdLevel();
}

export { starterScene, selectCutscene, badEnding };
