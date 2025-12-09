import { soundEffect } from "../audio/sound-effects.js";
import { gameData, levelData } from "../variables.js";
import { rectsIntersect } from "./collisions.js";
import { playerIcon } from "../variables.js";
import { updateProgressBar } from "../scores/progress-bar.js";

let shootingEnemies = 0;
let enemyShots = [];
const projectileSpeed = 4;
let animationStarted = false;
const projectileCtn = document.getElementById("projectiles");
let enemyShotTimeout = null;

function disableEnemyShooting() {
  clearTimeout(enemyShotTimeout);
  enemyShotTimeout = null;
  cancelAnimationFrame(animateEnemyShots);
}

function enableEnemyShooting() {
  const interval = Math.floor(Math.random() * 800) + 200;

  enemyShotTimeout = setTimeout(() => {
    selectEnemyShooter();
    enableEnemyShooting();
  }, interval);
}

function selectEnemyShooter() {
  if (shootingEnemies >= 4) {
    return;
  }

  const enemies = document.querySelectorAll(".enemy");
  // ---- Choisit quel ennemi tire au hasard parmi tous les ennemis présents
  const enemyID = Math.floor(Math.random() * enemies.length);
  const enemyShooter = enemies[enemyID];

  const enemyRect = enemyShooter.getBoundingClientRect();
  const containerRect = projectileCtn.parentElement.getBoundingClientRect();

  if (
    enemyShooter.classList.contains("is-hidden") ||
    enemyRect.left >= containerRect.width
  ) {
    return;
  }

  displayEnemyShot(enemyShooter);

  if (!animationStarted) {
    animationStarted = true;
    animateEnemyShots();
  }
}

function displayEnemyShot(enemy) {
  soundEffect("shoot");
  // ---- Affiche le tir ennemi

  const projectile = document.createElement("div");
  projectile.classList.add("enemy-projectile");

  shootingEnemies++;

  // Récupère la position de l'ennemi et du conteneur du jeu
  const enemyRect = enemy.getBoundingClientRect();
  const containerRect = projectileCtn.parentElement.getBoundingClientRect();

  // Place le projectile en-dessous de l'ennemi
  projectile.style.left = `${
    enemyRect.left - containerRect.left + enemyRect.width / 2 - 3
  }px`;
  projectile.style.top = `${
    enemyRect.top - containerRect.top + enemyRect.height
  }px`;
  projectileCtn.appendChild(projectile);
  enemyShots.push({
    element: projectile,
    y: parseFloat(projectile.style.top),
  });
}

function animateEnemyShots() {
  const container = document.getElementById("projectiles");
  const containerRect = container.parentElement.getBoundingClientRect();
  const playerRect = playerIcon.getBoundingClientRect();
  enemyShots.forEach((projectile, index) => {
    const pRect = projectile.element.getBoundingClientRect();
    projectile.y += projectileSpeed;
    projectile.element.style.top = projectile.y + "px";

    if (projectile.y >= containerRect.height - 30) {
      projectile.element.remove();
      enemyShots.splice(index, 1);
      shootingEnemies--;
    }

    if (rectsIntersect(playerRect, pRect)) {
      if (gameData.goodScore >= levelData.coworkerBonus) {
        gameData.goodScore -= levelData.coworkerBonus;
      } else if (gameData.goodScore < levelData.coworkerBonus) {
        gameData.goodScore -= gameData.goodScore;
      }
      console.log("Le joueur est touché ! Score valide :" + gameData.goodScore);
      // Animation de dégâts
      playerIcon.classList.add("player--hit");
      setTimeout(() => playerIcon.classList.remove("player--hit"), 200);
      // Supprimer le projectile
      projectile.element.remove();
      enemyShots.splice(index, 1);
      shootingEnemies--;
      updateProgressBar();
      return;
    }
  });

  requestAnimationFrame(animateEnemyShots);
}

export { enableEnemyShooting, disableEnemyShooting };
