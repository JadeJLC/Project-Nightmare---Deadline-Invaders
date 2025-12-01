import { gameData, lastLevel, menu } from "./variables.js";
import { loadMainMenu } from "./main-menu.js";

function resetGame() {
  gameData.lives = 3;
  gameData.currentLevel = 0;
  gameData.score = 0;
  gameData.powerups = [];
  gameData.job = "Dev";
  gameData.speed = 5;

  lastLevel.nb = 0;
  lastLevel.powerups = [];
  lastLevel.score = 0;
  lastLevel.lives = 3;

  document.getElementById("game-screen").classList.add("is-hidden");
  menu.classList.add("is-hidden");

  loadMainMenu();
}

function restartLevel() {
  gameData.score = lastLevel.score;
  gameData.lives = lastLevel.lives;
  gameData.powerups = lastLevel.powerups;

  loadLevel(gameData.currentLevel);
}

function loadLevel(level) {
  console.log(`Chargement du niveau ${level}`);
}

export { resetGame, restartLevel };
