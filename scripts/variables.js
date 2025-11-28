import { createRelou } from "./collegues.js";

let gameData = {
  playerName: "Player",
  relouName: "0",
  lives: 3,
  currentLevel: 0,
  levelscores: [0, 0, 0],
  score: 0,
  powerups: [],
  job: "Dev",
};

// Variable qui stocke le dernier niveau terminé pour permettre de recommencer le niveau
let lastLevel = {
  nb: 0,
  powerups: [],
  score: 0,
  lives: 3,
};

// gameData.relouName = prompt("Entrez le nom de votre collègue relou");
let relouImage = createRelou(gameData.relouName);

console.log(gameData);

const audioElement = document.getElementById("audio");
const musicBtn = document.getElementById("toggleMusic");
const restartBtn = document.getElementById("restart-level");
const resetBtn = document.getElementById("reset-game");

export { musicBtn, audioElement, restartBtn, resetBtn };
export { gameData, lastLevel };
