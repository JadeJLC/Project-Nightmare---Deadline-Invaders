import { gameData, style } from "./variables.js";
import { openPauseMenu, openSettingsMenu } from "./pause.js";
// import { playMusic } from "./audio.js";
import { movePlayer } from "./game-animations.js";
import { starterScene } from "./cutscenes/select-cutscene.js";
import { enableShooting } from "./shooting.js";

const gameScreenContainer = document.getElementById("game-screen");
const settingsIcon = document.getElementById("pause-btn");

function startGame(mode) {
  gameData.playerName = prompt("Entrez votre nom");
  while (gameData.playerName === "") {
    gameData.playerName = prompt("Nom invalide : nom vide. Entrez votre nom");
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
  console.log("Mode Histoire");
  document.getElementById("pause-menu").classList.add("is-hidden");
  document.getElementById("main-menu").classList.add("is-hidden");
  style.setAttribute("href", "");
  gameScreenContainer.classList.remove("is-hidden");
  updatePauseButton();
  movePlayer();
  starterScene();
  style.setAttribute("href", "game.css");
  enableShooting();
}

function endlessMode() {
  console.log("Mode Sans-Fin");
  // ---- Lance le mode sans fin
}

function updatePauseButton() {
  settingsIcon.removeEventListener("click", openSettingsMenu);
  settingsIcon.textContent = "||"; // Ou une vraie icône SVG
  settingsIcon.title = settingsIcon.alt = "Pause";
  settingsIcon.addEventListener("click", openPauseMenu);
}

export { startGame };
