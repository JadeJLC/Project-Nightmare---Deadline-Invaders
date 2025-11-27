// Menu principal qui se charge au lancement du jeu

import { playMusic } from "./audio";

const container = document.getElementById("main-menu");
const style = document.getElementById("style");

export function loadMainMenu() {
  style.setAttribute("href", "main-menu.css");
  container.innerHTML = ""; // Nettoyage si déjà présent

  // Titre central
  const title = document.createElement("h1");
  title.textContent = "Project Nightmare : Deadline Invaders";
  title.className = "menu-title";
  container.appendChild(title);

  // Boutons
  const buttons = [
    { label: "Mode Histoire", onClick: () => console.log("Mode Histoire") },
    { label: "Mode Sans-Fin", onClick: () => console.log("Mode Sans-Fin") },
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

  // Icône paramètres
  const settingsIcon = document.createElement("div");
  settingsIcon.className = "settings-icon";
  settingsIcon.textContent = "⚙️"; // Ou une vraie icône SVG
  settingsIcon.title = "Paramètres";
  settingsIcon.addEventListener("click", () => console.log("Paramètres"));
  container.appendChild(settingsIcon);

  playMusic("main-menu");
}
