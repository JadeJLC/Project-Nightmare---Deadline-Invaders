import { playerIcon, gameData } from "./variables.js";

let movingRight = false;
let movingLeft = false;

function movePlayer() {
  playerIcon.style.transform = "rotateZ(0deg)";
  const iconWidth = parseInt(
    window.getComputedStyle(playerIcon).getPropertyValue("width")
  );
  const borders = getPlayArea();
  let currentPosition = playerIcon.offsetLeft;

  if (movingRight && currentPosition <= borders.width - iconWidth) {
    playerIcon.style.left = `${currentPosition + gameData.speed}px`;
    playerIcon.style.transform = "rotateZ(10deg)";
  }
  if (movingLeft && currentPosition >= 0) {
    playerIcon.style.left = `${currentPosition - gameData.speed}px`;
    playerIcon.style.transform = "rotateZ(-10deg)";
  }

  requestAnimationFrame(movePlayer);
}

function getPlayArea() {
  return document.getElementById("game-screen").getBoundingClientRect();
}

// gestion des touches
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") movingRight = true;
  if (e.key === "ArrowLeft") movingLeft = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") movingRight = false;
  if (e.key === "ArrowLeft") movingLeft = false;
});

function checkPlayerPosition() {
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

window.addEventListener("resize", checkPlayerPosition);

export { movePlayer };
