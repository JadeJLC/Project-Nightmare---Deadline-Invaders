import { loadMainMenu } from "./main-menu.js";
import { restartBtn, resetBtn } from "./variables.js";
import { restartLevel, resetGame } from "./checkpoints.js";

// Gestion du jeu (déplacement des collègues et du joueur)

// Initialisation du jeu
function init() {
  restartBtn.addEventListener("click", () => restartLevel());
  resetBtn.addEventListener("click", () => resetGame());
  loadMainMenu();
}

init();
