// Menu principal qui se charge au lancement du jeu

import { playMusic } from "./audio.js";
import { openSettingsMenu, openPauseMenu } from "./pause.js";
import { musicBtn, style } from "./variables.js";
import { startGame } from "./startgame.js";

const mainMenuContainer = document.getElementById("main-menu");
const settingsIcon = document.getElementById("pause-btn");

export function loadMainMenu() {
  style.setAttribute("href", "main-menu.css");
  mainMenuContainer.innerHTML = "";

  // Création des éléments HTML
  mainMenuTitle();
  mainMenuButtons();
  updateSettingsButton();

  // Lancement de la musique
  if (musicBtn.classList.contains("music-on")) {
    console.log("Lecture de la musique.");
    playMusic("main-menu");
  }
}

// #region **** HTML creation functions
function mainMenuTitle() {
  const title = document.createElement("h1");
  title.textContent = "Project Nightmare : Deadline Invaders";
  title.className = "menu-title";
  mainMenuContainer.appendChild(title);
}

function mainMenuButtons() {
  const buttons = [
    { label: "Mode Histoire", onClick: () => startGame("Story") },
    { label: "Mode Sans-Fin", onClick: () => startGame("Endless") },
    { label: "Tableau des scores", onClick: () => console.log("Scores") },
  ];

  const buttonmainMenu = document.createElement("div");
  buttonmainMenu.className = "button-stack";

  buttons.forEach(({ label, onClick }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "menu-button";
    btn.addEventListener("click", onClick);
    buttonmainMenu.appendChild(btn);
  });

  mainMenuContainer.appendChild(buttonmainMenu);
}

function updateSettingsButton() {
  settingsIcon.removeEventListener("click", openPauseMenu);
  settingsIcon.textContent = "⚙️"; // Ou une vraie icône SVG
  settingsIcon.title = settingsIcon.alt = "Paramètres";
  settingsIcon.addEventListener("click", openSettingsMenu);

  playMusic("main-menu");
}
// #endregion
