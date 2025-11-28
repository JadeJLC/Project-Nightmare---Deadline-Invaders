import { gameData, lastLevel } from "./variables.js";
import { loadMainMenu } from "./main-menu.js";

function resetGame() {
  gameData = {
    playerName: "Player",
    relouName: "0",
    lives: 3,
    currentLevel: 0,
    score: 0,
    powerups: [],
    job: "Dev",
  };

  let lastLevel = {
    nb: 0,
    powerups: [],
    score: 0,
    lives: 3,
  };

  loadMainMenu();
}

function restartLevel() {
  gameData.score = lastLevel.score;
  gameData.lives = lastLevel.lives;
  gameData.powerups = lastLevel.powerups;

  loadLevel(gameData.currentLevel);
}

export { resetGame, restartLevel };
