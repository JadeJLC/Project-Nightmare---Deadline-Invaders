import { gameData, style, mainMenuContainer } from "../variables.js";
import { openPauseMenu, openSettingsMenu } from "../menus/pause.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { initLives } from "../mechanics/life.js";
import { loadMainMenu } from "../menus/main-menu.js";

const gameScreenContainer = document.getElementById("game-screen");
const settingsIcon = document.getElementById("pause-btn");

function startGame(mode) {
  style.setAttribute("href", "stylesheets/game.css");
  mainMenuContainer.innerHTML = "";
  gameData.playerName = prompt("Entrez votre nom :");
  while (gameData.playerName === "") {
    gameData.playerName = prompt(
      "Votre nom ne peut être vide. Entrez votre nom :"
    );
  }
  if (gameData.playerName === null) {
    loadMainMenu();
  }

  switch (mode) {
    case "Story":
      storyMode();
      break;
    case "Endless":
      endlessMode();
      break;
  }
}

function storyMode() {
  console.log(`Lancement du jeu en mode Histoire par ${gameData.playerName}`);
  gameData.gameMode = "Histoire";
  document.getElementById("pause-menu").classList.add("is-hidden");
  gameScreenContainer.classList.remove("is-hidden");
  updatePauseButton();
  selectCutscene();
  initLives();
}

function endlessMode() {
  console.log("Mode Sans-Fin");
  gameData.gameMode = "Sans fin";
  // ---- Lance le mode sans fin
}

function updatePauseButton() {
  settingsIcon.removeEventListener("click", openSettingsMenu);
  settingsIcon.textContent = "| |";
  settingsIcon.title = settingsIcon.alt = "Pause";
  settingsIcon.addEventListener("click", openPauseMenu);
}

export { startGame };
