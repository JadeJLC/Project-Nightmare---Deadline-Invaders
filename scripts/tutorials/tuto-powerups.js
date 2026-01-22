import { pauseGame, resumeGame } from "../menus/pause.js";
import { mainMenuContainer } from "../variables.js";

function tutoPowerUps(message) {
  pauseGame();

  // Création du formulaire de base
  const popup = document.createElement("form");
  popup.classList.add("confirm-pannel");
  popup.classList.add("popup");
  popup.name = "Tuto";
  popup.innerHTML = message;

  const confirm = document.createElement("button");
  confirm.type = "button";
  confirm.textContent = "Compris";
  confirm.id = "confirm-btn";
  confirm.value = "oui";

  popup.appendChild(confirm);

  mainMenuContainer.appendChild(popup);
  confirm.focus();

  confirm.addEventListener("click", function () {
    popup.remove();
    resumeGame();
  });
}

export { tutoPowerUps };
