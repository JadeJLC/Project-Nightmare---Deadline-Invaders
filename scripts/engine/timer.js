import { gameData, timerZone, maxTimer } from "../variables.js";
import { finishLevel } from "./levels.js";

let timerId = null;

function startTimer() {
  console.log("Ajout du timer");
  if (timerId !== null) return; // évite de lancer plusieurs fois

  timerId = setInterval(() => {
    gameData.timer++;
    if (gameData.timer > maxTimer / 100) {
      console.log("Temps écoulé");
      finishLevel();
    }
  }, 100);
}

function displayTimer() {
  timerZone.textContent = `Temps : ${Math.floor(gameData.timer / 10)} / ${
    maxTimer / 1000
  }s`;
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function removeTimer() {
  gameData.timer = 0;
  timerZone.textContent = "";
  timerId = null;
}

export { startTimer, displayTimer, pauseTimer, removeTimer };
