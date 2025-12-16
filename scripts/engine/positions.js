import { playerIcon } from "../variables.js";

// Récupération des bordures de l'écran de jeu pour les cinématiques et les déplacement du joueur ou des ennemis
function getPlayArea() {
  return document.getElementById("game-screen").getBoundingClientRect();
}

// Déplacement automatique du joueur dans le cadre si la fenêtre est redimensionné
function fixPlayerPosition() {
  const iconWidth = parseInt(
    window.getComputedStyle(playerIcon).getPropertyValue("width")
  );
  const borders = getPlayArea();
  let currentPosition = playerIcon.offsetLeft;

  if (currentPosition > borders.width - iconWidth) {
    playerIcon.style.left = `${borders.width - iconWidth}px`;
  }

  if (currentPosition < 0) {
    playerIcon.style.left = `0px`;
  }
}

window.addEventListener("resize", fixPlayerPosition);

export { getPlayArea };
