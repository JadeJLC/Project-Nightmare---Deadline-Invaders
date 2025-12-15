import { gameData, levelData, gameScreen } from "../variables.js";
import { EnemyCarousel } from "./lines-builder.js";

window.addEventListener("resize", createGameScreen);

let enemyLoopId = null;
let currentCarousel = null;

function createGameScreen() {
  const gameScreenWidth = window
    .getComputedStyle(gameScreen)
    .getPropertyValue("width");

  screenConfig.screenWidth = parseInt(gameScreenWidth);
  screenConfig.enemiesPerLine = levelData.enemiesPerLine;
  const availableWidth = screenConfig.screenWidth - 200;
  screenConfig.enemySpacingX =
    availableWidth / (screenConfig.enemiesPerLine - 1);
  if (screenConfig.enemySpacingX < 30) screenConfig.enemySpacingX = 30;

  if (window.innerHeight > window.innerWidth) {
    screenConfig.speed = 0.03;
    gameData.speed = 3;
  } else {
    screenConfig.speed = 2;
    gameData.speed = 5;
  }
}

const screenConfig = {
  screenWidth: 800,
  enemiesPerLine: 12,
  enemySpacingX: 70, // Sera recalculé dans createGameScreen
  lineSpacingY: 60,
  moveSpeedX: 2,
};

function newCarousel() {
  createGameScreen();
  console.log(
    `Largeur écran: ${screenConfig.screenWidth}, Espacement: ${screenConfig.enemySpacingX}`
  );
  currentCarousel = new EnemyCarousel(screenConfig, levelData);
  return currentCarousel;
}

function enemyLoop(carousel) {
  carousel.update();
  enemyLoopId = requestAnimationFrame(() => enemyLoop(carousel));
}

function pauseEnemyLoop() {
  cancelAnimationFrame(enemyLoopId);
  enemyLoopId = null;
}

function resumeEnemyLoop() {
  enemyLoop(currentCarousel);
}

export { enemyLoop, newCarousel, pauseEnemyLoop, resumeEnemyLoop };
