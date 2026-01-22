import { floatingPowerUp, spawnPowerUp } from "./powerup-spawn.js";
import { levelData } from "../variables.js";
import { screenConfig } from "../enemies/enemies.js";

let isPaused = false;
let loopId = null;

function startPowerUpMove() {
  if (isPaused) return;

  if (!floatingPowerUp.currentPowerUp) {
    floatingPowerUp.currentPowerUp = spawnPowerUp(screenConfig, levelData);
  }

  floatingPowerUp.currentPowerUp.update(screenConfig);

  loopId = requestAnimationFrame(startPowerUpMove);
}

function pausePowerUpMove() {
  if (isPaused) return;

  isPaused = true;
  if (loopId !== null) {
    cancelAnimationFrame(loopId);
    loopId = null;
  }
}

function resumePowerUpMove() {
  if (!isPaused) return;

  isPaused = false;
  startPowerUpMove();
}

export { startPowerUpMove, pausePowerUpMove, resumePowerUpMove };
