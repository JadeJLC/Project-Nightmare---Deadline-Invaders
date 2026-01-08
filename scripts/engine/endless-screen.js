import { cutsceneAnimation } from "../variables.js";
import { startEndless } from "./endless.js";

function deleteEndlessScreen() {
  cutsceneAnimation.innerHTML = "";
}

function displayEndlessScreen() {
  console.log("cutsceneAnimation:", cutsceneAnimation);
  cutsceneAnimation.innerHTML = "";
  cutsceneAnimation.classList.remove("is-hidden");
  console.log("Classes de la div:", cutsceneAnimation.className);

  // Titre
  const title = document.createElement("h2");
  title.textContent = "Mode Sans-Fin";
  cutsceneAnimation.appendChild(title);

  // Règles
  const rules = document.createElement("p");
  rules.textContent =
    "Dans ce mode, les lignes descendent indéfiniment. " +
    "Une ligne est supprimée quand il ne reste que des Relous, " +
    "et une nouvelle apparaît en haut.";
  cutsceneAnimation.appendChild(rules);

  // Bouton pour lancer le jeu
  const startBtn = document.createElement("button");
  startBtn.textContent = "Commencer";
  startBtn.id = "start-endless-btn";
  cutsceneAnimation.appendChild(startBtn);
  console.log("Contenu après injection:", cutsceneAnimation.innerHTML);
  startBtn.addEventListener("click", () => {
    deleteEndlessScreen();
    startEndless(); // ta fonction existante
  });
}

export { displayEndlessScreen, deleteEndlessScreen };
