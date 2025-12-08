import { gameData } from "../variables.js";
import { finishLevel } from "../engine/levels.js";

export function updateProgressBar() {
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
