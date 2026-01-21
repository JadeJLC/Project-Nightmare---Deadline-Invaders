import { pauseCarousel, resumeCarousel } from "../enemies/enemies.js";
import {
  disableEnemyShooting,
  enableEnemyShooting,
} from "../mechanics/enemy-shooting.js";
import { updateProgressBar } from "../scores/progress-bar.js";
import {
  gameData,
  levelData,
  enemyLines,
  gameMessage,
  projectiles,
} from "../variables.js";
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

  pauseCarousel();

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
    resumeCarousel();
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
    if (gameData.powerups[i] === "Team Building") {
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

// Powerup Perfectionnisme : les collègues cessent d'envoyer des bugs pendant un court instant
// ----- Activé en appuyant sur la touche "W"
function perfectionism() {
  gameData.activePU = "Bonus actif : Perfectionnisme";

  disableEnemyShooting();

  let shots = projectiles.children;

  for (var i = shots.length - 1; i >= 0; i--) {
    var projectile = shots[i];
    if (projectile.classList.contains("enemy-projectile")) {
      projectile.remove();
    }
  }

  for (let i = 0; i < gameData.powerups.length; i++) {
    console.log(gameData.powerups[i]);
    if (gameData.powerups[i] === "Perfect") {
      gameData.powerups.splice(i, 1);
      displayPowerUps();
      break;
    }
  }

  // Retire l'effet au bout de 5 secondes
  setTimeout(() => {
    enableEnemyShooting();
    gameData.activePU = "";
    gameMessage.textContent = gameData.activePU;
  }, 5000);
}

// Powerup Backup : retire du pourcentage rouge
// ----- Activé en appuyant sur la touche "W"
function backup() {
  gameData.activePU = "Bonus utilisé : Backup";

  gameData.badScore -= levelData.relouMalus;
  updateProgressBar();

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
  perfectionism,
  backup,
  teamBuild,
};
