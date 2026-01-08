import { menu, closeConfirm, closeBtn, gameData } from "../variables.js";
import {
  disableMovement,
  enableMovement,
} from "../mechanics/player-movement.js";
import {
  disableShooting,
  enableShooting,
} from "../mechanics/player-shooting.js";
import {
  disableEnemyShooting,
  enableEnemyShooting,
  pauseEnemyShots,
  resumeEnemyShots,
} from "../mechanics/enemy-shooting.js";
import { pauseTimer, startTimer } from "../engine/timer.js";
import { pauseCarousel, resumeCarousel } from "../enemies/enemies.js";

// ===== OUVERTURE DU MENU =====
function openSettingsMenu() {
  pauseMenu("settings");
}

function openPauseMenu() {
  pauseMenu("pause");
}

function pauseMenu(type) {
  closeBtn.onclick = resumeGame;
  closeConfirm.onclick = resumeGame;

  menu.classList.toggle("is-hidden");

  // Si le menu se ferme, reprendre le jeu
  if (menu.classList.contains("is-hidden")) {
    resumeGame();
    return;
  }

  // Configurer le menu selon le type
  switch (type) {
    case "settings":
      menu.querySelector("h2").textContent = "Paramètres";
      menu.querySelector("div").classList.add("is-hidden");
      closeBtn.textContent = "Fermer le menu";
      break;
    case "pause":
      menu.querySelector("h2").textContent = "Pause";
      menu.querySelector("div").classList.remove("is-hidden");
      closeBtn.textContent = "Reprendre";
      pauseGame();
      closeConfirm.addEventListener("click", resumeGame);
      break;
  }

  // Mettre le jeu en pause
  pauseGame();
}

// ===== PAUSE DU JEU =====
function pauseGame() {
  disableMovement();
  disableShooting();
  disableEnemyShooting();
  pauseEnemyShots();
  pauseTimer();

  pauseCarousel();
  closeBtn.focus();
}

// ===== REPRISE DU JEU =====
function resumeGame() {
  menu.classList.add("is-hidden");
  console.log(gameData);

  if (gameData.currentMusic === "main-menu") return;
  enableMovement();
  enableEnemyShooting();
  enableShooting();
  resumeEnemyShots();
  startTimer();

  // ✅ Un seul appel pour reprendre le carousel, quel que soit le mode
  resumeCarousel();
}

export { pauseMenu, openPauseMenu, openSettingsMenu, resumeGame, pauseGame };
