import { menu, closeConfirm, closeBtn } from "../variables.js";
import { cancelConfirm } from "./confirm.js";
import {
  disableMovement,
  enableMovement,
} from "../animations/player-movement.js";
import { disableShooting, enableShooting } from "../mechanics/shooting.js";
import {
  disableEnemyShooting,
  enableEnemyShooting,
  pauseEnemyShots,
  resumeEnemyShots,
} from "../mechanics/enemy-shooting.js";
import { pauseTimer, startTimer } from "../engine/timer.js";
import { pauseEnemyLoop, resumeEnemyLoop } from "../enemies/enemies.js";

// Ouverture du menu en fonction du mode (Paramètre ou Pause)
function openSettingsMenu() {
  pauseMenu("settings");
}

function openPauseMenu() {
  pauseMenu("pause");
}

function pauseGame() {
  disableMovement();
  disableShooting();
  disableEnemyShooting();
  pauseEnemyShots();
  pauseTimer();
  pauseEnemyLoop();
}

// Fonction pour l'ouverture du menu pause
// ----- Le menu se crée en mode "Paramètres" ou "Pause" selon la page sur laquelle on se trouve
function pauseMenu(type) {
  menu.classList.toggle("is-hidden");
  closeBtn.addEventListener("click", resumeGame);

  if (menu.classList.contains("is-hidden")) {
    resumeGame();
    return;
  }

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
      break;
  }
  pauseGame();
  closeConfirm.addEventListener("click", resumeGame);
}

function resumeGame() {
  menu.classList.add("is-hidden");
  enableMovement();
  enableEnemyShooting();
  enableShooting();
  resumeEnemyShots();
  startTimer();
  resumeEnemyLoop();

  console.log("Reprise du jeu");
}

export { pauseMenu, openPauseMenu, openSettingsMenu, resumeGame };
