import { soundEffect } from "../audio/sound-effects.js";

let shootingEnemies = 0;
let enemyShots = [];
const projectileSpeed = 4;
let animationStarted = false;
const projectileCtn = document.getElementById("projectiles");
let enemyShotTimeout = null;

function disableEnemyShooting() {
  clearTimeout(enemyShotTimeout);
  enemyShotTimeout = null;
}

function enableEnemyShooting() {
  console.log("Activation des tirs ennemis");
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

  enemyShots.forEach((projectile, index) => {
    projectile.y += projectileSpeed;
    projectile.element.style.top = projectile.y + "px";

    if (projectile.y >= containerRect.height - 30) {
      projectile.element.remove();
      enemyShots.splice(index, 1);
      shootingEnemies--;
    }
  });

  requestAnimationFrame(animateEnemyShots);
}

export { enableEnemyShooting, disableEnemyShooting };
