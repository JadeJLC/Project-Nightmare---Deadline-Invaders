import { gameData, HUD } from "../variables.js";
import { finishLevel } from "../engine/levels.js";

const progressBar = document.getElementById("progress-score");
const progressText = document.getElementById("progress-text");

function updateProgressBar() {
  if (gameData.gameMode == "Endless") return;
  let total = gameData.goodScore + gameData.badScore;

  const goodBar = document.getElementById("good-progress");
  const badBar = document.getElementById("bad-progress");
  const goodScore = document.getElementById("good-score");
  const badScore = document.getElementById("bad-score");

  goodBar.style.height = badBar.style.bottom = gameData.goodScore + "%";
  badBar.style.height = gameData.badScore + "%";
  goodScore.textContent = gameData.goodScore;
  badScore.textContent = gameData.badScore;

  let index = gameData.currentLevel - 1;

  if (gameData.badScore > 100) gameData.badScore === 100;
  if (gameData.goodScore > 100) gameData.goodScore === 100 - gameData.badScore;

  if (total > 100) total = 100;

  if (total === 100) {
    gameData.countPoint = false;
    gameData.levelscores[index] = gameData.goodScore;
    if (gameData.levelscores[index] > 100)
      gameData.levelscores[index] = 100 - gameData.badScore;

    console.log(
      "Fin du niveau. Pourcentage de bonne qualité : ",
      gameData.levelscores[index],
      "%"
    );
    finishLevel();
  }
}

function updateProgressScore() {
  if (gameData.gameMode !== "Endless") return;

  const score = gameData.goodScore;

  // Afficher uniquement le score
  progressText.textContent = `Score : ${score}`;

  // Pas de barre de progression en mode Sans Fin, juste le score
  document.getElementById("progress-container").style.display = "none";
}

// ===== INITIALISATION =====
function initProgressDisplay() {
  if (gameData.gameMode === "Histoire") {
    // Afficher les barres de progression
    progressBar.style.display = "block";
    updateProgressBar();
  } else if (gameData.gameMode === "Endless") {
    // Masquer les barres, afficher juste le score
    progressBar.style.display = "none";
    updateProgressScore();
  }
}

export { updateProgressBar, updateProgressScore, initProgressDisplay };
