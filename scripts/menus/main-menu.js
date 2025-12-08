import { playMusic } from "../audio/music.js";
import { openSettingsMenu, openPauseMenu, resumeGame } from "./pause.js";
import {
  musicBtn,
  style,
  closeBtn,
  mainMenuContainer,
  menu,
  gameData,
} from "../variables.js";
import { startGame } from "../engine/startgame.js";

const settingsIcon = document.getElementById("pause-btn");

// Création du menu principal
// ---- Pour alléger les performances et la page HTML, le menu principal est créé dynamiquement uniquement lorsqu'il est appelé, et supprimé au lancement du jeu
export function loadMainMenu() {
  style.setAttribute("href", "stylesheets/main-menu.css");
  mainMenuContainer.innerHTML = "";
  menu.classList.add("is-hidden");

  // Création des éléments HTML
  mainMenuTitle();
  mainMenuButtons();
  updateSettingsButton();

  // Lancement de la musique
  if (gameData.musicOn) {
    playMusic(gameData.currentMusic);
  }
}

// #region **** Fonctions pour la création du HTML
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
    btn.textContent = btn.alt = btn.title = label;
    btn.className = "menu-button";
    btn.addEventListener("click", onClick);
    buttonmainMenu.appendChild(btn);
  });

  mainMenuContainer.appendChild(buttonmainMenu);
}

function updateSettingsButton() {
  closeBtn.addEventListener("click", openSettingsMenu);
  closeBtn.removeEventListener("click", resumeGame);

  settingsIcon.removeEventListener("click", openPauseMenu);
  settingsIcon.textContent = "⚙️";
  settingsIcon.title = settingsIcon.alt = "Paramètres";
  settingsIcon.addEventListener("click", openSettingsMenu);

  playMusic("main-menu");
}
// #endregion
