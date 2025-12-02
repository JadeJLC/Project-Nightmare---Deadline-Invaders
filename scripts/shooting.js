import { playerIcon, gameData } from "./variables.js";

// Vitesse de déplacement des projectiles
const projectileSpeed = 8;

// Tableau qui stocke tous les projectiles actifs à l'écran
let projectiles = [];

/**
 * Active le tir avec la touche ESPACE
 */
function enableShooting() {
  // Écoute l'événement "keydown" pour détecter l'appui sur la barre espace
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Empêche la page de scroller
      shoot(); // Lance un projectile
    }
  });

  // Lance l'animation continue des projectiles
  animateProjectiles();
}

/**
 * Crée un projectile et l'ajoute dans la zone de jeu
 */
function shoot() {
  const container = document.getElementById("projectiles"); // Conteneur où les projectiles sont placés

  // Création d'un DIV représentant le projectile
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");

  // Récupère la position du joueur et du conteneur du jeu
  const playerRect = playerIcon.getBoundingClientRect();
  const containerRect = container.parentElement.getBoundingClientRect();

  // Place le projectile au centre horizontal du joueur et juste au-dessus
  projectile.style.left = `${playerRect.left - containerRect.left + playerRect.width / 2 - 3}px`;
  projectile.style.top = `${playerRect.top - containerRect.top - 10}px`;

  // Ajoute le projectile dans le DOM
  container.appendChild(projectile);

  // Ajoute le projectile dans le tableau avec sa position Y
  projectiles.push({
    element: projectile,
    y: parseFloat(projectile.style.top)
  });
}

/**
 * Anime tous les projectiles existants
 */
function animateProjectiles() {
  projectiles.forEach((projectile, index) => {
    // Déplace le projectile vers le haut
    projectile.y -= projectileSpeed;
    projectile.element.style.top = projectile.y + "px";

    // Si le projectile sort de l’écran (au-dessus)
    if (projectile.y < -20) {
      projectile.element.remove(); // Retire du DOM
      projectiles.splice(index, 1); // Retire du tableau
    }
  });

  // Continue l'animation à chaque frame
  requestAnimationFrame(animateProjectiles);
}

export { enableShooting };
