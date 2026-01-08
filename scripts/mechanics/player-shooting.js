import {
  levelData,
  playerIcon,
  gameData,
  enemiesRegistry,
} from "../variables.js";
import { Coworker, Relou } from "../enemies/coworker-class.js";
import { rectsIntersect, enemyDamage } from "./collisions.js";
import { soundEffect } from "../audio/sound-effects.js";
import {
  updateProgressScore,
  updateProgressBar,
} from "../scores/progress-bar.js";

const projectileSpeed = 5;
let projectiles = [];
let isShooting = false;
let lastShotTime = 0;
let shootingLoopId = null;
let projectileAnimId = null;

function pressSpace(e) {
  if (e.code === "Space") {
    e.preventDefault();
    isShooting = true;
  }
}

function releaseSpace(e) {
  if (e.code === "Space") {
    isShooting = false;
  }
}

function disableShooting() {
  console.log("Suppression de la capacité de tir");
  document.removeEventListener("keydown", pressSpace);
  document.removeEventListener("keyup", releaseSpace);

  if (shootingLoopId) {
    cancelAnimationFrame(shootingLoopId);
    shootingLoopId = null;
  }
  if (projectileAnimId) {
    cancelAnimationFrame(projectileAnimId);
    projectileAnimId = null;
  }

  isShooting = false;
}

// Fonction pour activer les tirs en appuyant sur la touche espace
// ---- Le tir est actif en continu tant que la touche est pressée, avec un délai entre chaque tir
function enableShooting() {
  // Avant de relancer, on s'assure que rien ne tourne encore
  disableShooting();

  gameData.countPoint = true;
  console.log("Activation des tirs du joueur");
  document.addEventListener("keydown", pressSpace);
  document.addEventListener("keyup", releaseSpace);

  function shootingLoop() {
    const now = Date.now();
    if (isShooting && now - lastShotTime >= gameData.shotCooldown) {
      soundEffect("shoot");
      shoot();
      lastShotTime = now;
    }
    shootingLoopId = requestAnimationFrame(shootingLoop);
  }

  function animateLoop() {
    animateProjectiles();
    projectileAnimId = requestAnimationFrame(animateLoop);
  }

  shootingLoopId = requestAnimationFrame(shootingLoop);
  projectileAnimId = requestAnimationFrame(animateLoop);
}

// Fonction pour créer les projectiles
// ----- Ajoute un élément HTML de class "projectile" démarrant à la position du joueur
function shoot() {
  const container = document.getElementById("projectiles");

  const projectile = document.createElement("div");
  projectile.classList.add("player-projectile");

  // Récupère la position du joueur et du conteneur du jeu
  const playerRect = playerIcon.getBoundingClientRect();
  const containerRect = container.parentElement.getBoundingClientRect();

  // Place le projectile au centre horizontal du joueur et juste au-dessus
  projectile.style.left = `${
    playerRect.left - containerRect.left + playerRect.width / 2 - 3
  }px`;
  projectile.style.top = `${playerRect.top - containerRect.top - 10}px`;
  container.appendChild(projectile);
  projectiles.push({
    element: projectile,
    y: parseFloat(projectile.style.top),
  });
}

// Fonction pour animer les projectiles
// ----- Anime tous les projectiles créés en les déplaçant vers le cadre supérieur de l'écran
// ----- Supprimer les projectiles lorsqu'ils atteignent le haut de l'écran
function animateProjectiles() {
  for (let index = projectiles.length - 1; index >= 0; index--) {
    const projectile = projectiles[index];
    projectile.y -= projectileSpeed;
    projectile.element.style.top = projectile.y + "px";

    // Supprimer si hors écran
    if (projectile.y < -10) {
      projectile.element.remove();
      projectiles.splice(index, 1);
      continue; // passer au projectile suivant
    }

    // Test de collisions
    const pRect = projectile.element.getBoundingClientRect();

    for (let i = 0; i < enemiesRegistry.length; i++) {
      const enemy = enemiesRegistry[i];
      if (!enemy.isAlive) continue; // ignorer les morts

      const eRect = enemy.el.getBoundingClientRect();

      if (rectsIntersect(pRect, eRect) && gameData.countPoint) {
        // Calculer la différence pour le mode Histoire
        let difference = 100 - gameData.goodScore - gameData.badScore;

        // Collision détectée
        projectile.element.remove();
        projectiles.splice(index, 1);

        // Utiliser la fonction enemyDamage qui gère les deux modes
        enemyDamage(enemy, difference);

        // Mettre à jour l'affichage selon le mode
        if (gameData.gameMode === "Endless") {
          updateProgressScore();
        } else {
          updateProgressBar();
        }

        break; // projectile détruit, on sort de la boucle ennemis
      }
    }
  }
}

export { enableShooting, disableShooting };
