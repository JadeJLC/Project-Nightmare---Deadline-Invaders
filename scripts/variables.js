import { createRelou } from "./collegues.js";

let gameData = {
  playerName: "Player",
  relouName: "0",
  lives: 3,
  currentLevel: 0,
  score: 0,
  job: "Dev",
};

// gameData.relouName = prompt("Entrez le nom de votre collègue relou");
let relouImage = createRelou(gameData.relouName);

console.log(gameData);

const audioElement = document.getElementById("audio");
const musicBtn = document.getElementById("toggleMusic");

export { musicBtn, audioElement, gameData };
