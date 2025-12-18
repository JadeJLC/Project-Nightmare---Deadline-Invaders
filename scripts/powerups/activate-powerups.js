import { gameData } from "../variables.js";
import {
  diplomacy,
  productivityBoost,
  speedBoost,
  talkToBoss,
  teamBuilding,
} from "./powerups-effects.js";

function enablePowerUps() {
  document.addEventListener("keydown", usePowerUps);
}

function disablePowerUps() {
  document.removeEventListener("keydown", usePowerUps);
}

function usePowerUps(e) {
  if (gameData.activePU != "") return;
  if (e.key === "v" && gameData.powerups.includes("Diplomate")) diplomacy();
  if (e.key === "c" && gameData.powerups.includes("Café")) speedBoost();
  if (e.key === "b" && gameData.powerups.includes("Team")) teamBuilding();
  if (e.key === "x" && gameData.powerups.includes("Patron")) talkToBoss();
  if (e.key === "n" && gameData.powerups.includes("Boost")) productivityBoost();
}

export { enablePowerUps, disablePowerUps };
