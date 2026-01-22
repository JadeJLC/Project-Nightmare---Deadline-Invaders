import { resumePowerUpMove } from "./powerup-move.js";
import { floatingPowerUp } from "./powerup-spawn.js";

// #region ***** Timer pour l'apparition des powerups dans l'écran de jeu
let powerUpTimeout;
let isTimerActive = false;
let minWait = 6000;
let maxWait = 12000;

function startPowerUpTimeout() {
  if (!isTimerActive) return;

  const delay = Math.floor(Math.random() * (maxWait - minWait + 1)) + minWait;

  console.log(delay);
  powerUpTimeout = setTimeout(() => {
    if (!floatingPowerUp.isThere) floatingPowerUp.currentPowerUp = null;
    resumePowerUpMove();
    startPowerUpTimeout();
  }, delay);
}

function stopPowerUpTimeout() {
  isTimerActive = false;
  clearTimeout(powerUpTimeout);
}

function resumePowerUpTimeout() {
  if (isTimerActive) return;
  isTimerActive = true;
  startPowerUpTimeout();
}
// #endregion

function powerUpTimer() {}

// A implémenter : timer indiquant le temps restant sur le powerup

export { stopPowerUpTimeout, resumePowerUpTimeout };
