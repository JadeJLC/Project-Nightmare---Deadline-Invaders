import { gameData, style, mainMenuContainer } from "../variables.js";
import { openPauseMenu, openSettingsMenu } from "../menus/pause.js";
import { enemyLoop, newCarousel } from "../enemies/enemies.js";
import { starterScene } from "../cutscenes/select-cutscene.js";
import { enableShooting } from "../mechanics/shooting.js";
import { initLives } from "../mechanics/life.js";
import { updateProgressBar } from "../mechanics/progress-bar.js";

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
  document.getElementById("pause-menu").classList.add("is-hidden");
  gameScreenContainer.classList.remove("is-hidden");
  updatePauseButton();
  starterScene();
  initLives();
  updateProgressBar();
  const checkCutscene = setInterval(() => {
    if (gameData.loadedCutscene) {
      clearInterval(checkCutscene);
      const carousel = newCarousel();
      enemyLoop(carousel);
      enableShooting();
    }
  }, 200);
  enableShooting();
}

function endlessMode() {
  console.log("Mode Sans-Fin");
  // ---- Lance le mode sans fin
}

function updatePauseButton() {
  settingsIcon.removeEventListener("click", openSettingsMenu);
  settingsIcon.textContent = "| |";
  settingsIcon.title = settingsIcon.alt = "Pause";
  settingsIcon.addEventListener("click", openPauseMenu);
}

export { startGame };
