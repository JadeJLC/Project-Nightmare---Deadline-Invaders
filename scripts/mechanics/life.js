import { gameData } from "../variables.js";

function initLives() {
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < gameData.lives; i++) {
    const heart = document.createElement("img");
    heart.src = "/images/life.png";
    heart.alt = "Vie";
    livesContainer.appendChild(heart);
  }
}

function loseLife() {
  if (gameData.lives > 0) {
    gameData.lives--;
    updateLives();
  }
  if (gameData.lives === 0) {
    console.log("Game Over");
  }
}

function updateLives() {
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < gameData.lives; i++) {
    const heart = document.createElement("img");
    heart.src = "../life.png";
    heart.alt = "Vie";
    livesContainer.appendChild(heart);
  }
}

export { initLives, loseLife };
