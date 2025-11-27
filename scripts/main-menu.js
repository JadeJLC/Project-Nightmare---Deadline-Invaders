// Menu principal qui se charge au lancement du jeu

import { playMusic } from "./audio.js";
import { pauseMenu } from "./pause.js";
import { musicBtn } from "./variables.js";
import { startGame } from "./startgame.js";

const container = document.getElementById("main-menu");
const style = document.getElementById("style");

export function loadMainMenu() {
  style.setAttribute("href", "main-menu.css");
  container.innerHTML = "";

  // Création des éléments HTML
  mainMenuTitle();
  mainMenuButtons();
  settingsButton();

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
  container.appendChild(title);
}

function mainMenuButtons() {
  const buttons = [
    { label: "Mode Histoire", onClick: () => startGame("Story") },
    { label: "Mode Sans-Fin", onClick: () => startGame("Endless") },
    { label: "Tableau des scores", onClick: () => console.log("Scores") },
  ];

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-stack";

  buttons.forEach(({ label, onClick }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "menu-button";
    btn.addEventListener("click", onClick);
    buttonContainer.appendChild(btn);
  });

  container.appendChild(buttonContainer);
}

function settingsButton() {
  const settingsIcon = document.createElement("div");
  settingsIcon.className = "settings-icon";
  settingsIcon.textContent = "⚙️"; // Ou une vraie icône SVG
  settingsIcon.title = settingsIcon.alt = "Paramètres";
  settingsIcon.addEventListener("click", () => pauseMenu("settings"));
  container.appendChild(settingsIcon);

  playMusic("main-menu");
}
// #endregion
