import { loadMainMenu } from "./main-menu.js";
import { restartBtn, resetBtn } from "./variables.js";
import { confirmReset, confirmRestart } from "./pause.js";
import { playMusic } from "./audio.js";

// Gestion du jeu (déplacement des collègues et du joueur)

// Initialisation du jeu
function init() {
  restartBtn.addEventListener("click", () => confirmRestart());
  resetBtn.addEventListener("click", () => confirmReset());
  loadMainMenu();
  playMusic("main-menu");
}

init();
