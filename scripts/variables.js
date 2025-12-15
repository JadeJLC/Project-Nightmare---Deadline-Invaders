// #region ---- Données de jeu

// Variables stockant les données actuelles du joueur
let gameData = {
  playerName: "Player",
  relouName: "0",
  lives: 3,
  currentLevel: 0,
  timer: 0,
  levelscores: [0, 0, 0],
  goodScore: 0,
  badScore: 0,
  powerups: [],
  job: "dev",
  speed: 5,
  loadedCutscene: false,
  countPoint: false,
  currentMusic: "main-menu",
  shotCooldown: 600,
  gameMode: "",
};

let gameOptions = {
  musicOn: false,
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
const maxTimer = 60000;

const cookieName = "ScoreBoard";

export {
  gameData,
  gameOptions,
  defaultData,
  lastLevel,
  defaultLevel,
  enemiesRegistry,
  cookieName,
  maxTimer,
};

// #endregion

// #region ---- Elements HTML

// Bases de la page
const musicBox = document.getElementById("audio");
const musicBtn = document.getElementById("toggle-music");
const effectBtn = document.getElementById("toggle-effects");
const style = document.getElementById("style");
const mainMenuContainer = document.getElementById("main-menu");
const scoreBoardContainer = document.getElementById("score-board");

export {
  musicBox,
  musicBtn,
  effectBtn,
  style,
  mainMenuContainer,
  scoreBoardContainer,
};

// Menu pause
const menu = document.getElementById("pause-menu");
const restartBtn = document.getElementById("restart-level");
const resetBtn = document.getElementById("reset-game");
const confirmBtn = document.getElementById("confirm-button");
const closeConfirm = document.getElementById("close-confirm");
const confirmZone = document.getElementById("confirm-menu");
const closeBtn = document.getElementById("close-menu");
const rulesBtn = document.getElementById("display-rules");

export {
  menu,
  restartBtn,
  resetBtn,
  confirmBtn,
  closeConfirm,
  confirmZone,
  closeBtn,
  rulesBtn,
};

// Ecran de jeu
const gameScreen = document.getElementById("game-screen");
const timerZone = document.getElementById("timer");
const playerIcon = document.getElementById("player-icon");
const enemyLines = document.getElementById("enemy-carousel");
const HUD = document.getElementById("HUD");

export { playerIcon, gameScreen, timerZone, enemyLines, HUD };

// Cinématiques
const sceneZone = document.getElementById("cutscene");
const typeZone = document.getElementById("cutscene-text");
const skipBtn = document.getElementById("skip-cutscene");
const endLvl = document.getElementById("end-level");
const toCutscene = document.getElementById("launch-cutscene");
const cutsceneAnimation = document.getElementById("cutscene-action");

export { typeZone, sceneZone, skipBtn, endLvl, toCutscene, cutsceneAnimation };

// #endregion

// Définition des niveaux :
const allLevelData = {
  1: {
    lineCount: 5,
    relouPerLine: 2,
    enemiesPerLine: 12,
    coworkerBonus: 5,
    relouMalus: 5,
  },
  2: {
    lineCount: 5,
    relouPerLine: 3,
    enemiesPerLine: 14,
    coworkerBonus: 5,
    relouMalus: 7,
  },
  3: {
    lineCount: 4,
    relouPerLine: 4,
    enemiesPerLine: 16,
    coworkerBonus: 4,
    relouMalus: 8,
  },
};

let levelData = { ...allLevelData[1] };

export { levelData, allLevelData };
