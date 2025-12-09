import { loadMainMenu } from "../menus/main-menu.js";
import {
  gameData,
  cookieName,
  mainMenuContainer,
  scoreBoardContainer,
} from "../variables.js";

function addScoreToScoreboard() {
  console.log("Sauvegarde du score");
  if (gameData.gameMode === "") {
    return;
  }
  const scoreToSave = {
    player: gameData.playerName,
    score: gameData.score,
    mode: gameData.gameMode,
    timestamp: new Date(),
  };

  const existingScores = localStorage.getItem(cookieName);

  let scoreboardData = existingScores ? JSON.parse(existingScores) : [];
  scoreboardData.push(scoreToSave);

  localStorage.setItem(cookieName, JSON.stringify(scoreboardData));
}

function retrieveScores() {
  const scoreString = localStorage.getItem(cookieName);
  const scores = scoreString ? JSON.parse(scoreString) : [];

  scores.sort((a, b) => b.score - a.score);

  return scores;
}

function displayScores() {
  mainMenuContainer.innerHTML = "";
  scoreBoardTitle();
  const scores = retrieveScores();

  if (scores.length === 0) {
    emptyScoreBoard();
  } else {
    createScoreBoard(scores);
  }
}

// #region ----- Création des éléments HTML
function scoreBoardTitle() {
  const title = document.createElement("h1");
  title.innerHTML = "Tableau des scores";
  title.className = "menu-title";
  mainMenuContainer.appendChild(title);
}

function emptyScoreBoard() {
  let noScores = document.createElement("div");
  noScores.classList.add("confirm-pannel");
  noScores.innerHTML = "Aucun score à afficher pour l'instant<br/><br/>";

  const backToMain = document.createElement("button");
  backToMain.textContent = "Retour au menu principal";
  backToMain.addEventListener("click", loadMainMenu);
  noScores.appendChild(backToMain);
  scoreBoardContainer.appendChild(noScores);
}

function createScoreBoard(scores) {
  let scoreBoard = document.createElement("table");
  scoreBoard.innerHTML =
    "<thead><th>Joueur</th><th>Score</th><th>Mode</th><th>Date</th></thead>";

  scoreBoard.classList.add("scoreboard");

  let scoreBoardBody = document.createElement("tbody");

  scores.forEach((score) => {
    let newRow = document.createElement("tr");
    let date = formatDate(new Date(score.timestamp));
    newRow.innerHTML = `<td>${score.player}</td><td>${score.score}</td><td>${score.mode}</td><td>${date}</td>`;
    scoreBoardBody.appendChild(newRow);
  });

  let buttonRow = document.createElement("tr");
  let buttonContainer = document.createElement("td");
  buttonContainer.setAttribute("colspan", "4");

  const backToMain = document.createElement("button");
  backToMain.textContent = "Retour au menu principal";
  backToMain.classList.add("back-to-main");
  backToMain.addEventListener("click", loadMainMenu);

  buttonContainer.appendChild(backToMain);
  buttonRow.appendChild(buttonContainer);
  scoreBoardBody.appendChild(buttonRow);

  scoreBoard.appendChild(scoreBoardBody);

  scoreBoardContainer.append(scoreBoard);
}

function formatDate(date) {
  let day = date.getUTCDate().toString().padStart(2, "0");
  let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  let year = date.getUTCFullYear();

  let time =
    date.getHours().toString() +
    "h" +
    date.getMinutes().toString().padStart(2, "0");

  return `${day} / ${month} / ${year}
  </br> ${time}`;
}
// #endregion

export { addScoreToScoreboard, displayScores };
