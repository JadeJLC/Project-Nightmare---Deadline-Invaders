import { gameData } from "../variables.js";
import { badEnding } from "../cutscenes/select-cutscene.js";

function initLives() {
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < gameData.lives; i++) {
    const heart = document.createElement("img");
    heart.src = "/images/interface/life.png";
    heart.alt = "Vie";
    livesContainer.appendChild(heart);
  }
}

function loseLife() {
  if (gameData.lives > 0) {
    gameData.lives--;
    initLives();
  }
  if (gameData.lives === 0) {
    badEnding();
  }
}

// function updateLives() {
//   const livesContainer = document.getElementById("lives");
//   livesContainer.innerHTML = "";
//   for (let i = 0; i < gameData.lives; i++) {
//     const heart = document.createElement("img");
//     heart.src = "/images/interface/life.png";
//     heart.alt = "Vie";
//     livesContainer.appendChild(heart);
//   }
// }

export { initLives, loseLife };
