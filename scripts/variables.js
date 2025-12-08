// #region ---- Données de jeu

// Variables stockant les données actuelles du joueur
let gameData = {
  playerName: "Player",
  relouName: "0",
  lives: 3,
  currentLevel: 0,
  levelscores: [0, 0, 0],
  goodScore: 0,
  badScore: 0,
  powerups: [],
  job: "dev",
  speed: 5,
  loadedCutscene: false,
  currentMusic: "main-menu",
  shotCooldown: 200,
};

let gameOptions = {
  musicOn: true,
  soundEffects: true,
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

// Liste des ennemis
const enemiesRegistry = [];

export {
  gameData,
  gameOptions,
  defaultData,
  lastLevel,
  defaultLevel,
  enemiesRegistry,
};
// #endregion

// #region ---- Elements HTML

// Bases de la page
const musicBox = document.getElementById("audio");
const musicBtn = document.getElementById("toggle-music");
const effectBtn = document.getElementById("toggle-effects");
const style = document.getElementById("style");
const mainMenuContainer = document.getElementById("main-menu");

export { musicBox, musicBtn, effectBtn, style, mainMenuContainer };

// Menu pause
const menu = document.getElementById("pause-menu");
const restartBtn = document.getElementById("restart-level");
const resetBtn = document.getElementById("reset-game");
const confirmBtn = document.getElementById("confirm-button");
const closeConfirm = document.getElementById("close-confirm");
const confirmZone = document.getElementById("confirm-menu");
const closeBtn = document.getElementById("close-menu");

export {
  menu,
  restartBtn,
  resetBtn,
  confirmBtn,
  closeConfirm,
  confirmZone,
  closeBtn,
};

// Ecran de jeu
const gameScreen = document.getElementById("game-screen");
const playerIcon = document.getElementById("player-icon");
const enemyLines = document.getElementById("enemy-carousel");
const HUD = document.getElementById("HUD");

export { playerIcon, gameScreen, enemyLines, HUD };

// Cinématiques
const sceneZone = document.getElementById("cutscene");
const typeZone = document.getElementById("cutscene-text");
const skipBtn = document.getElementById("skip-cutscene");

export { typeZone, sceneZone, skipBtn };

// #endregion

// Définition des niveaux :
const level1Data = {
  lineCount: 5,
  relouPerLine: 1,
  enemiesPerLine: 12,
  pointsPerEnemy: 5,
};

const level2Data = {
  lineCount: 4,
  relouPerLine: 3,
  enemiesPerLine: 14,
  pointsPerEnemy: 3,
};

const level3Data = {
  lineCount: 4,
  relouPerLine: 5,
  enemiesPerLine: 16,
  pointsPerEnemy: 2,
};

let levelData = { ...level1Data };

export { levelData };
