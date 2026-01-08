import { gameData, levelData, gameScreen } from "../variables.js";
import { EnemyCarousel } from "./lines-builder.js";

// ===== CONFIGURATION =====
const screenConfig = {
  screenWidth: 800,
  enemiesPerLine: 12,
  enemySpacingX: 70,
  lineSpacingY: 60,
  moveSpeedX: 2,
};

// ===== ÉTAT GLOBAL =====
let currentCarousel = null;
let loopId = null;
let isPaused = false;
let updateCallback = null; // Pour le mode Endless qui a sa propre logique d'update

// ===== INITIALISATION =====
window.addEventListener("resize", updateScreenConfig);

function updateScreenConfig() {
  let width = gameScreen.offsetWidth;

  if (!width || isNaN(width)) {
    console.warn("Largeur invalide, valeur par défaut");
    width = 800;
  }

  screenConfig.screenWidth = width;
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

  console.log("screenConfig:", screenConfig);
}

// ===== CRÉATION DU CAROUSEL =====
function createCarousel(levelConfig = levelData) {
  updateScreenConfig();
  console.log(
    `Création carousel - Largeur: ${screenConfig.screenWidth}, Espacement: ${screenConfig.enemySpacingX}`
  );

  currentCarousel = new EnemyCarousel(screenConfig, levelConfig);
  isPaused = false;
  updateCallback = null; // Reset le callback

  return currentCarousel;
}

// ===== BOUCLE DE JEU =====
function carouselLoop() {
  if (isPaused) return;

  if (!currentCarousel) {
    console.error("❌ Pas de carousel actif !");
    stopCarousel();
    return;
  }

  // Si un callback personnalisé est défini (mode Endless), l'utiliser
  if (updateCallback) {
    updateCallback(currentCarousel);
  } else {
    // Sinon, update standard (mode Story)
    currentCarousel.update();
  }

  loopId = requestAnimationFrame(carouselLoop);
}

// ===== CONTRÔLES =====
function startCarousel(customUpdateCallback = null) {
  if (loopId !== null) {
    return;
  }

  if (!currentCarousel) {
    return;
  }

  isPaused = false;
  updateCallback = customUpdateCallback;
  carouselLoop();
}

function pauseCarousel() {
  if (isPaused) {
    return;
  }

  isPaused = true;
  if (loopId !== null) {
    cancelAnimationFrame(loopId);
    loopId = null;
  }
}

function resumeCarousel() {
  if (!isPaused) {
    return;
  }

  if (!currentCarousel) {
    return;
  }

  isPaused = false;
  carouselLoop();
}

function stopCarousel() {
  if (loopId !== null) {
    cancelAnimationFrame(loopId);
    loopId = null;
  }
  isPaused = false;
  updateCallback = null;
}

function destroyCarousel() {
  stopCarousel();
  currentCarousel = null;
}

// ===== ACCESSEURS =====
function getCarousel() {
  return currentCarousel;
}

function isCarouselActive() {
  return loopId !== null && !isPaused;
}

function isCarouselPaused() {
  return isPaused;
}

// ===== EXPORTS =====
export {
  // Création
  createCarousel,

  // Contrôles
  startCarousel,
  pauseCarousel,
  resumeCarousel,
  stopCarousel,
  destroyCarousel,

  // Accesseurs
  getCarousel,
  isCarouselActive,
  isCarouselPaused,

  // Config (pour compatibilité)
  updateScreenConfig as createGameScreen,
};
