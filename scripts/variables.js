import { createRelou } from "./collegues.js";

// #region ---- Données de jeu
let gameData = {
  playerName: "Player",
  relouName: "0",
  loadedCutscene: false,
  lives: 3,
  currentLevel: 0,
  levelscores: [0, 0, 0],
  score: 0,
  powerups: [],
  job: "Dev",
  speed: 5,
};

// Variable qui stocke le dernier niveau terminé pour permettre de recommencer le niveau
let lastLevel = {
  nb: 0,
  powerups: [],
  score: 0,
  lives: 3,
};

let relouImage = createRelou(gameData.relouName);

export { gameData, lastLevel };
// #endregion

// #region ---- Elements HTML

// Bases de la page
const audioElement = document.getElementById("audio");
const musicBtn = document.getElementById("toggle-music");
const style = document.getElementById("style");

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

// Cinématiques
const typeZone = document.getElementById("cutscene-text");
const sceneZone = document.getElementById("cutscene");
const skipBtn = document.getElementById("skip-cutscene");

export {
  audioElement,
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
};

// Définition des niveaux :

const level1Data = {
  lineCount: 5,
  relouPerLine: 1,
};

export { level1Data };
