import { gameData } from "../variables.js";
import { openPauseMenu, openSettingsMenu } from "../menus/pause.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { initLives } from "../mechanics/life.js";
import { createEndlessRules } from "../menus/rules.js";

const gameScreenContainer = document.getElementById("game-screen");
const settingsIcon = document.getElementById("pause-btn");

function startGame() {
  switch (gameData.gameMode) {
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
  document.getElementById("pause-menu").classList.add("is-hidden");
  gameScreenContainer.classList.remove("is-hidden");
  document.getElementById("level-score").classList.remove("is-hidden");
  document.getElementById("progress-score").classList.remove("is-hidden");
  document.getElementById("progress-text").classList.add("is-hidden");
  updatePauseButton();
  selectCutscene();
  initLives();
}

function endlessMode() {
  console.log("Lancement du jeu en mode Sans fin par ${gameData.playerName}");
  gameData.relouName("Collègue relou");
  gameScreenContainer.classList.remove("is-hidden");
  HUD.classList.remove("is-hidden");
  document.getElementById("level-score").classList.add("is-hidden");
  document.getElementById("progress-score").classList.add("is-hidden");
  document.getElementById("progress-text").classList.remove("is-hidden");
  updatePauseButton();
  createEndlessRules();
  initLives();
}

function updatePauseButton() {
  settingsIcon.removeEventListener("click", openSettingsMenu);
  settingsIcon.textContent = "| |";
  settingsIcon.title = settingsIcon.alt = "Pause";
  settingsIcon.addEventListener("click", openPauseMenu);
}

export { startGame };
