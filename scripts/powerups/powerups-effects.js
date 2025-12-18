import { pauseEnemyLoop, resumeEnemyLoop } from "../enemies/enemies.js";
import { gameData, levelData, enemyLines, gameMessage } from "../variables.js";
import { displayPowerUps } from "./display-powerups.js";

let teamBuild = false;

// Powerup caféine : Accélère les déplacements du personnage joueur.
// ---- Activé en appuyant sur la touche "C"
function speedBoost() {
  gameData.activePU = "Bonus actif : Café";
  const normalSpeed = gameData.speed;
  gameData.speed = 8;

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Café") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire l'effet au bout de 7 secondes
  setTimeout(() => {
    gameData.speed = normalSpeed;
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 7000);
}

// Powerup collègue diplomate : Le mouvement des lignes s'interrompt temporairement et il devient plus facile d'avancer dans le projet.
// ----- Activé en appuyant sur la touche "V"
function diplomacy() {
  gameData.activePU = "Bonus actif : Collègue diplomate";

  pauseEnemyLoop();

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Diplomate") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire l'effet au bout de 3 secondes
  setTimeout(() => {
    resumeEnemyLoop();
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 3000);
}

// Powerup Team Building : Tirer sur le collègue relou augmente le pourcentage positif du projet.
// ---- Activé en appuyant sur la touche "B"
function teamBuilding() {
  gameData.activePU = "Bonus actif : Team Building";
  teamBuild = true;

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Team") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire l'effet au bout de 5 secondes
  setTimeout(() => {
    teamBuild = false;
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 5000);
}

// Powerup Boost de Productivité : Double le pourcentage de projet attribué par chaque tir positif.
// ---- Activé en appuyant sur la touche "N"
function productivityBoost() {
  gameData.activePU = "Bonus actif : Boost de productivité";

  const normalBonus = levelData.coworkerBonus;
  levelData.coworkerBonus *= 2;

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Boost") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire l'effet au bout de 5 secondes
  setTimeout(() => {
    levelData.coworkerBonus = normalBonus;
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 5000);
}

// Powerup Dénonciation :  Un collègue relou est retiré de la ligne la plus proche du joueur.
// ----- Activé en appuyant sur la touche X
function talkToBoss() {
  gameData.activePU = "Bonus utilisé : Dénonciation";

  let coworkers = enemyLines.children;

  for (var i = coworkers.length - 1; i >= 0; i--) {
    var coworker = coworkers[i];
    if (coworker.id === "") {
      coworker.remove();
      displayPowerUps();
      break;
    }
  }

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Patron") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire le message au bout de deux secondes
  setTimeout(() => {
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 2000);
}

export {
  speedBoost,
  diplomacy,
  teamBuilding,
  productivityBoost,
  talkToBoss,
  teamBuild,
};
