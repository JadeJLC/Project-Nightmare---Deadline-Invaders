import { playerIcon, gameData } from "../variables.js";
import { getPlayArea } from "../engine/positions.js";

let movingRight = false;
let movingLeft = false;

// Fonction gérant le déplacement du joueur
// ----- Le mouvement se gère entièrement au clavier en appuyant sur Flèche Gauche ou Flèche Droite
// ----- Le joueur se déplace de Xpx vers la droite ou la gauche selon le paramètre gameData.speed, et un effet d'inclinaison est appliqué à l'image
function movePlayer() {
  playerIcon.style.transform = "rotateZ(0deg)";
  const iconWidth = parseInt(
    window.getComputedStyle(playerIcon).getPropertyValue("width")
  );
  const borders = getPlayArea();
  let currentPosition = playerIcon.offsetLeft;

  if (movingRight && currentPosition <= borders.width - iconWidth - 10) {
    playerIcon.style.left = `${currentPosition + gameData.speed}px`;
    playerIcon.style.transform = "rotateZ(10deg)";
  }
  if (movingLeft && currentPosition >= 10) {
    playerIcon.style.left = `${currentPosition - gameData.speed}px`;
    playerIcon.style.transform = "rotateZ(-10deg)";
  }

  requestAnimationFrame(movePlayer);
}

function disableMovement() {
  document.removeEventListener("keydown", startMovement);
  document.removeEventListener("keyup", stopMovement);
  movingLeft = false;
  movingRight = false;
  cancelAnimationFrame(movePlayer);
}

function enableMovement() {
  console.log("Activation des mouvements");
  document.addEventListener("keydown", startMovement);
  document.addEventListener("keyup", stopMovement);
}

// #region ---- Gestion des touches
function startMovement(e) {
  if (e.key === "ArrowRight") movingRight = true;
  if (e.key === "ArrowLeft") movingLeft = true;
}

function stopMovement(e) {
  if (e.key === "ArrowRight") movingRight = false;
  if (e.key === "ArrowLeft") movingLeft = false;
}
// #endregion

export { movePlayer, enableMovement, disableMovement };
