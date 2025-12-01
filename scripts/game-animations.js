import { playerIcon, gameData } from "./variables.js";

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
}

export { movePlayer };
