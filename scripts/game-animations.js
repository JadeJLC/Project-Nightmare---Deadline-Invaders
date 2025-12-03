import { playerIcon, gameData } from "./variables.js";
/*
function movePlayer() {
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowLeft" || key === "ArrowRight") {
      event.preventDefault();
    }

    const movement = {
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
    }[key];

    movement?.();
  });
}

function getPlayArea() {
  return document.getElementById("game-screen").getBoundingClientRect();
}

function moveLeft() {
  let currentPosition = playerIcon.offsetLeft;
  let newPosition = playerIcon.offsetLeft - gameData.speed;
  const borders = getPlayArea();

  if (currentPosition > 0) {
    playerIcon.style.left = `${newPosition}px`;
  }
}

function moveRight() {
  let currentPosition = playerIcon.offsetLeft;
  let newPosition = playerIcon.offsetLeft + gameData.speed;
  const iconWidth = parseInt(
    window.getComputedStyle(playerIcon).getPropertyValue("width")
  );
  const borders = getPlayArea();

  if (currentPosition <= borders.width - iconWidth) {
    playerIcon.style.left = `${newPosition}px`;
  }
}*/

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

export { movePlayer };
