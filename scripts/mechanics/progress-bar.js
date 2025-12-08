import { gameData } from "../variables.js";

export function updateProgressBar() {
  const total = gameData.goodScore + gameData.badScore;

  const goodBar = document.getElementById("good-progress");
  const badBar = document.getElementById("bad-progress");
  const goodScore = document.getElementById("good-score");
  const badScore = document.getElementById("bad-score");

  goodBar.style.height = badBar.style.bottom = gameData.goodScore + "%";
  badBar.style.height = gameData.badScore + "%";
  goodScore.textContent = gameData.goodScore;
  badScore.textContent = gameData.badScore;

  if (total >= 100) {
    console.log(
      "Fin du niveau. Pourcentage de bonne qualité : ",
      gameData.goodScore,
      "%"
    );
  }
}
