import { loadMainMenu } from "../menus/main-menu.js";
import {
  gameData,
  gameState,
  cookieName,
  mainMenuContainer,
  scoreBoardContainer,
  menu,
} from "../variables.js";

let newMenuOption = null;
let currentPage = 1;
let totalPages = 1;

async function addScoreToScoreboard() {
  let gameMode = "";
  if (gameData.gameMode === "Story") gameMode = "Histoire";
  if (gameData.gameMode === "Endless") gameMode = "Sans fin";
  if (gameData.gameMode === "") return;

  const scoreToSave = {
    name: gameData.playerName,
    score:
      gameData.levelscores[0] +
      gameData.levelscores[1] +
      gameData.levelscores[2],
    mode: gameMode,
    timestamp: new Date(),
  };

  try {
    const res = await fetch("http://localhost:5280/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scoreToSave),
    });

    if (!res.ok) {
      console.error("Erreur la requête POST vers l'API :", res.status);
    }

    let currentScore = await res.json();
    gameState.lastAddedScore = currentScore;

    console.log("Score enregistré");
    return currentScore;
  } catch (err) {
    console.error("Pas de réponse de l'API :", err);
  }
}

async function retrieveScores(pageToDisplay = 1) {
  try {
    const res = await fetch(
      `http://localhost:5280/scores?page=${pageToDisplay}`,
    );
    if (!res.ok) {
      console.error("Erreur lors de la requête GET vers l'API :", res.status);
      return { scores: [], pageToDisplay: 1, totalPages: 1 };
    }

    const data = await res.json();

    return {
      scores: data.scores,
      page: data.page,
      totalPages: data.totalPages,
    };
  } catch (err) {
    console.error("Impossible de récupérer les scores :", err);
    return { scores: [], pageToDisplay: 1, totalPages: 1 };
  }
}

async function displayScores(pageNumber = 1, gameEnd = false) {
  mainMenuContainer.innerHTML = "";
  scoreBoardTitle();

  try {
    const data = await retrieveScores(pageNumber);

    currentPage = data.page || 1;
    totalPages = data.totalPages || 1;

    if (!data.scores || data.scores.length === 0) {
      emptyScoreBoard();
    } else {
      console.log(`${data.scores.length} score(s) récupéré(s)`);
      createScoreBoard(data.scores, gameEnd);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des scores :", err);
    emptyScoreBoard();
  }
}

function displayPercentile(score) {
  const info = document.createElement("div");
  info.classList.add("percentile-info");
  info.innerHTML = `
    Bravo ${score.name} !
    Ton score est meilleur que <strong>${score.percentile}%</strong> des joueurs, tu es en ${score.rank}e position.
  `;
  scoreBoardContainer.insertBefore(info, scoreBoardContainer.firstChild);
  console.log(
    "Pourcentage affiché :",
    score.percentile,
    "% - Rang :",
    score.rank,
  );
}

// #region ----- Création des éléments HTML
function scoreBoardTitle() {
  const title = document.createElement("h1");
  title.innerHTML = "Tableau des scores";
  title.className = "menu-title";
  mainMenuContainer.appendChild(title);
  scoreBoardContainer.classList.remove("is-hidden");
}

function emptyScoreBoard() {
  let noScores = document.createElement("div");
  noScores.classList.add("confirm-pannel");
  noScores.innerHTML = "Aucun score à afficher pour l'instant<br/><br/>";

  const backToMain = document.createElement("button");
  backToMain.type = "button";
  backToMain.textContent = "Retour au menu principal";
  backToMain.addEventListener("click", loadMainMenu);
  noScores.appendChild(backToMain);
  scoreBoardContainer.appendChild(noScores);
}
//
function createPaginationButton(sign, pageNumber, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = sign;
  button.classList.add("pagination-button");
  button.addEventListener("click", () => {
    displayScores(pageNumber);
  });
  return button;
}

function createScoreBoard(scores, gameEnd) {
  scoreBoardContainer.innerHTML = "";

  //Percentile si fin de partie
  if (gameEnd && gameState.lastAddedScore) {
    displayPercentile(gameState.lastAddedScore);
  } else {
  }

  //Création du tableau
  let scoreBoard = document.createElement("table");
  scoreBoard.classList.add("scoreboard");
  scoreBoard.innerHTML = `<thead>
    <th>Rang</th>
    <th>Joueur</th>
    <th>Score</th>
    <th>Mode</th>
    <th>Date</th>
    </thead>`;

  let scoreBoardBody = document.createElement("tbody");
  scores.forEach((score) => {
    let newRow = document.createElement("tr");
    let date = formatDate(new Date(score.timestamp));
    newRow.innerHTML = `
    <td>${score.rank}</td>
    <td>${score.name}</td>
    <td>${score.score}</td>
    <td>${score.mode}</td>
    <td>${date}</td>`;
    scoreBoardBody.appendChild(newRow);
  });

  scoreBoard.appendChild(scoreBoardBody);

  //Pagination
  let paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  const firstButton = createPaginationButton("<<", 1, currentPage === 1);
  const prevButton = createPaginationButton(
    "<",
    currentPage - 1,
    currentPage === 1,
  );
  const nextButton = createPaginationButton(
    ">",
    currentPage + 1,
    currentPage === totalPages,
  );
  const lastButton = createPaginationButton(
    ">>",
    totalPages,
    currentPage === totalPages,
  );
  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
  pageIndicator.style.margin = "0 10px";

  paginationContainer.appendChild(firstButton);
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageIndicator);
  paginationContainer.appendChild(nextButton);
  paginationContainer.appendChild(lastButton);

  scoreBoardContainer.appendChild(scoreBoard);
  scoreBoardContainer.appendChild(paginationContainer);

  // Bouton de retour au menu (screen menu)
  if (gameState.screen === "menu") {
    const backToMain = document.createElement("button");
    backToMain.textContent = "Retour au menu principal";
    backToMain.classList.add("back-to-main");
    backToMain.addEventListener("click", loadMainMenu);
    scoreBoardContainer.appendChild(backToMain);
  }

  console.log("Tableau des scores créé et rempli");

  if (newMenuOption) {
    newMenuOption.remove();
    newMenuOption = null;
  }
}

function formatDate(date) {
  let day = date.getUTCDate().toString().padStart(2, "0");
  let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  let year = date.getUTCFullYear();

  let time =
    (date.getHours() + 1).toString() +
    "h" +
    date.getMinutes().toString().padStart(2, "0");

  return `${day} / ${month} / ${year}
  </br> ${time}`;
}
// #endregion

export { addScoreToScoreboard, displayScores, newMenuOption };
