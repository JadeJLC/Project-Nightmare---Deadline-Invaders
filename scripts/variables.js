import { createRelou } from "./enemies/coworker-images.js";

// #region ---- Données de jeu

// Variables stockant les données actuelles du joueur
let gameData = {
  playerName: "Player",
  relouName: "0",
  lives: 3,
  currentLevel: 0,
  levelscores: [0, 0, 0],
  score: 0,
  powerups: [],
  job: "dev",
  speed: 5,
  loadedCutscene: false,
  shotCooldown: 200,
};

// Variable pour enregistrer la progression du joueur lorsqu'il termine un niveau
let lastLevel = {
  nb: 0,
  powerups: [],
  score: 0,
  lives: 3,
};

// Variables par défaut pour la réinitialisation du jeu
const defaultData = JSON.parse(JSON.stringify(gameData));
const defaultLevel = JSON.parse(JSON.stringify(lastLevel));

let relouImage = createRelou(gameData.relouName);

export { gameData, defaultData, lastLevel, defaultLevel };
// #endregion

// #region ---- Elements HTML

// Bases de la page
const musicBox = document.getElementById("audio");
const musicBtn = document.getElementById("toggle-music");
const style = document.getElementById("style");
const mainMenuContainer = document.getElementById("main-menu");

// Menu pause
const menu = document.getElementById("pause-menu");
const restartBtn = document.getElementById("restart-level");
const resetBtn = document.getElementById("reset-game");
const confirmBtn = document.getElementById("confirm-button");
const closeConfirm = document.getElementById("close-confirm");
const confirmZone = document.getElementById("confirm-menu");
const closeBtn = document.getElementById("close-menu");

// Ecran de jeu
const playerIcon = document.getElementById("player-icon");
const gameScreen = document.getElementById("game-screen");
const enemyLines = document.getElementById("enemy-carousel");

// Cinématiques
const typeZone = document.getElementById("cutscene-text");
const sceneZone = document.getElementById("cutscene");
const skipBtn = document.getElementById("skip-cutscene");

export {
  mainMenuContainer,
  musicBox,
  musicBtn,
  restartBtn,
  resetBtn,
  playerIcon,
  style,
  menu,
  typeZone,
  sceneZone,
  confirmBtn,
  closeConfirm,
  confirmZone,
  skipBtn,
  gameScreen,
  closeBtn,
  enemyLines,
};

// Définition des niveaux :

const level1Data = {
  lineCount: 5,
  relouPerLine: 1,
};

export { level1Data };
