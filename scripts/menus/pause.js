import { menu, closeConfirm, closeBtn } from "../variables.js";
import { cancelConfirm } from "./confirm.js";

// Ouverture du menu en fonction du mode (Paramètre ou Pause)
function openSettingsMenu() {
  pauseMenu("settings");
}

function openPauseMenu() {
  pauseMenu("pause");
}

// Fonction pour l'ouverture du menu pause
// ----- Le menu se crée en mode "Paramètres" ou "Pause" selon la page sur laquelle on se trouve
function pauseMenu(type) {
  menu.classList.toggle("is-hidden");
  closeBtn.addEventListener("click", resumeGame);

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

  closeConfirm.addEventListener("click", cancelConfirm);

  // Fonctionnalité manquante : mise en pause des fonctions du jeu (vaisseau, tirs, mouvements des ennemis, etc)
}

function resumeGame() {
  menu.classList.add("is-hidden");
  console.log("Reprise du jeu");

  // Fonctionnalité manquante : remise en marche des fonctions du jeu
}

export { pauseMenu, openPauseMenu, openSettingsMenu, resumeGame };
