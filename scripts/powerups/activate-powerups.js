import { gameData } from "../variables.js";
import { powerupDetails } from "./display-powerups.js";
import {
  backup,
  diplomacy,
  perfectionism,
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

  if (e.key === "w" && gameData.powerups.includes("Perfectionnisme"))
    perfectionism();
  if (e.key === "x" && gameData.powerups.includes("Patron")) talkToBoss();
  if (e.key === "c" && gameData.powerups.includes("Café")) speedBoost();
  if (e.key === "v" && gameData.powerups.includes("Diplomate")) diplomacy();
  if (e.key === "b" && gameData.powerups.includes("Team Building"))
    teamBuilding();
  if (e.key === "n" && gameData.powerups.includes("Boost")) productivityBoost();
  if (e.key === "," && gameData.powerups.includes("Backup")) backup();

  if (e.key === "i" && gameData.powerups.length > 0) powerupDetails();
}

export { enablePowerUps, disablePowerUps };
