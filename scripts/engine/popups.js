import { gameData, style, mainMenuContainer, sceneZone } from "../variables.js";
import { completeIntroText } from "../cutscenes/cutscenes-helpers.js";
import { nextLine, pauseCutscene } from "../cutscenes/write-cutscenes.js";
import { loadMainMenu } from "../menus/main-menu.js";
import { startGame } from "./startgame.js";
import { skipCutscene } from "../cutscenes/skip-cutscene.js";
import { resumeCutscene } from "../cutscenes/write-cutscenes.js";

// Fonction pour demander au joueur d'entrer un nom
// ---- Accepte un argument "mode" (Cutscene pour la cinématique d'intro, SkipCutscene si on la passe, Story pour le mode histoire et Endless pour le mode sans fin
// ---- Accepte un deuxième argument "type" (Player ou Relou) pour l'endroit où enregistrer le nom
function namePopup(mode, type) {
  style.setAttribute("href", "stylesheets/game.css");
  mainMenuContainer.innerHTML = "";

  // Met la cinématique en pause | Termine la cinématique en mode skip
  if (mode === "Cutscene" || mode === "SkipCutscene") pauseCutscene();
  if (mode === "SkipCutscene") {
    sceneZone.classList.add("is-hidden");
  }

  // Création du formulaire de base
  const popup = document.createElement("form");
  popup.classList.add("confirm-pannel");
  popup.classList.add("popup");
  popup.name = "PlayerName";
  if (type === "Player") {
    popup.innerHTML = "<label>Entrez votre nom</label>";
  } else if (type === "Relou") {
    popup.innerHTML = "<label>Entrez le nom de votre collègue relou</label>";
  }

  const nameZone = document.createElement("input");
  nameZone.placeholder = "Entrer le nom ici";
  nameZone.required = true;

  const confirm = document.createElement("button");
  confirm.type = "submit";
  confirm.textContent = "Valider";

  popup.appendChild(nameZone);
  popup.appendChild(confirm);

  // Si le joueur vient de lancer le jeu, rajoute un bouton retour pour revenir au menu principal
  if (type === "Player") {
    const cancel = document.createElement("button");
    cancel.textContent = "Retour";
    cancel.type = "button";
    cancel.addEventListener("click", function (e) {
      e.preventDefault();
      popup.remove();
      loadMainMenu();
    });
    popup.appendChild(cancel);
  }

  mainMenuContainer.appendChild(popup);

  nameZone.focus();

  // Enregistre le nom dans gameData
  popup.addEventListener("submit", function (e) {
    e.preventDefault();
    let chosenName = nameZone.value.trim();

    if (chosenName) {
      chosenName = chosenName.replace(/^[a-z]/, (letter) =>
        letter.toUpperCase()
      );

      if (type === "Player") {
        gameData.playerName = chosenName;
      } else if (type === "Relou") {
        gameData.relouName = chosenName;
      }
    } else {
      popup.remove();
      namePopup();
    }

    popup.remove();

    // Lance le jeu ou relance/skip la cinématique
    if (mode === "Story" || mode === "Endless") {
      startGame(mode);
    } else if (mode === "Cutscene") {
      completeIntroText();
    } else if (mode === "SkipCutscene") {
      nextLine(true);
    }
  });
}

function confirmSkip() {
  pauseCutscene();

  // Création du formulaire de base
  const popup = document.createElement("form");
  popup.classList.add("confirm-pannel");
  popup.classList.add("popup");
  popup.name = "SkipScene";
  popup.innerHTML = "<label>Passer la cinématique ?</label>";

  const confirm = document.createElement("button");
  confirm.type = "button";
  confirm.textContent = "Oui";
  confirm.id = "confirm-btn";
  confirm.value = "oui";

  const cancel = document.createElement("button");
  cancel.textContent = "Non";
  cancel.type = "button";
  cancel.id = "cancel-btn";
  cancel.value = "non";

  popup.appendChild(confirm);
  popup.appendChild(cancel);

  mainMenuContainer.appendChild(popup);
  cancel.focus();

  document.addEventListener("keydown", switchAction);

  confirm.addEventListener("click", function () {
    popup.remove();
    skipCutscene();
    document.removeEventListener("keydown", switchAction);
  });
  cancel.addEventListener("click", function () {
    popup.remove();
    resumeCutscene();
    document.removeEventListener("keydown", switchAction);
  });
}

function switchAction(e) {
  const confirm = document.getElementById("confirm-btn");
  const cancel = document.getElementById("cancel-btn");

  if (e.key === "ArrowUp") {
    confirm.focus();
  } else if (e.key === "ArrowDown") {
    cancel.focus();
  }
}

export { namePopup, confirmSkip };
