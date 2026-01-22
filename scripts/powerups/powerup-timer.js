import { spawnPowerUp } from "./powerup-spawn.js";
import { screenConfig } from "../enemies/enemies.js";
import { levelData } from "../variables.js";

// #region ***** Timer pour l'apparition des powerups dans l'écran de jeu
let powerUpTimeout;
let isTimerActive = false;
let minWait = 5000; // 10 seconds
let maxWait = 15000; // 20 seconds

function startPowerUpTimer() {
  if (!isTimerActive) return;

  const delay = Math.floor(Math.random() * (maxWait - minWait + 1)) + minWait;

  powerUpTimeout = setTimeout(() => {
    spawnPowerUp(screenConfig, levelData);
    startPowerUpTimer();
  }, delay);
}

function stopPowerUpTimer() {
  isTimerActive = false;
  clearTimeout(powerUpTimeout);
}

function resumePowerUpTimer() {
  if (isTimerActive) return;
  isTimerActive = true;
  startPowerUpTimer();
}
// #endregion

// A implémenter : timer indiquant le temps restant sur le powerup

export { stopPowerUpTimer, resumePowerUpTimer };
