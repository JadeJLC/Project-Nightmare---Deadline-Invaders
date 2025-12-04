import { createRelou } from "./collegues.js";

// #region ---- Données de jeu
let gameData = {
  playerName: "Player",
  relouName: "0",
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
const audioElement = document.getElementById("audio");
const musicBtn = document.getElementById("toggle-music");
const restartBtn = document.getElementById("restart-level");
const resetBtn = document.getElementById("reset-game");
const playerIcon = document.getElementById("player-icon");
const style = document.getElementById("style");
const menu = document.getElementById("pause-menu");
const typeZone = document.getElementById("cutscene-text");
const sceneZone = document.getElementById("cutscene");

const confirmBtn = document.getElementById("confirm-button");
const confirmZone = document.getElementById("confirm-menu");
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
  confirmZone,
  skipBtn,
};
