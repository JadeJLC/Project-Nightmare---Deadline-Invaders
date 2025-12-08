import { playerIcon, gameData } from "../variables.js";

const projectileSpeed = 5;
let projectiles = [];
let isShooting = false;
let lastShotTime = 0;

// Fonction pour activer les tirs en appuyant sur la touche espace
// ---- Le tir est actif en continu tant que la touche est pressée, avec un délai entre chaque tir
function enableShooting() {
  document.addEventListener("keydown", pressSpace);
  document.addEventListener("keyup", releaseSpace);

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

  function shootingLoop() {
    const now = Date.now();
    if (isShooting && now - lastShotTime >= gameData.shotCooldown) {
      shoot();
      lastShotTime = now;
    }
    requestAnimationFrame(shootingLoop);
  }

  shootingLoop();
  animateProjectiles();
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
  projectiles.forEach((projectile, index) => {
    projectile.y -= projectileSpeed;
    projectile.element.style.top = projectile.y + "px";

    if (projectile.y < -20) {
      projectile.element.remove();
      projectiles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateProjectiles);
}

export { enableShooting };
