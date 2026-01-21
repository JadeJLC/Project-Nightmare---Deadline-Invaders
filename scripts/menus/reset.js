import {
  gameData,
  gameState,
  defaultData,
  defaultLevel,
  lastLevel,
  gameScreen,
  confirmBtn,
  confirmZone,
  playerIcon,
  enemyLines,
  projectiles,
  gameOptions,
  HUD,
  endLvl,
  sceneZone,
  enemiesRegistry,
  powerupsZone,
  gameMessage,
  typeZone,
  cutsceneAnimation,
} from "../variables.js";
import { loadMainMenu } from "./main-menu.js";
import { disableEnemyShooting } from "../mechanics/enemy-shooting.js";
import { disableMovement } from "../mechanics/player-movement.js";
import { disableShooting } from "../mechanics/player-shooting.js";
import { removeTimer, pauseTimer } from "../engine/timer.js";
import { pauseCutscene } from "../cutscenes/write-cutscenes.js";
import { destroyCarousel, stopCarousel } from "../enemies/enemies.js";
import { disablePowerUps } from "../powerups/activate-powerups.js";
import { stopMusic } from "../audio/music.js";
import { cutsceneDeleteCoworkers } from "../cutscenes/images-cutscenes.js";
import { stopPowerUpTimer } from "../powerups/powerup-timer.js";

/**
 * Fonction pour redémarrer le jeu depuis le menu principal
 *
 * Cette fonction effectue une réinitialisation COMPLÈTE du jeu :
 * - Désactive tous les systèmes actifs (tirs, mouvements, ennemis, power-ups)
 * - Nettoie le DOM (ennemis, projectiles, animations)
 * - Réinitialise toutes les données de jeu
 * - CONSERVE les paramètres utilisateur (gameOptions : musique, effets sonores, map)
 * - Recharge le menu principal
 */
function resetGame() {
  if (gameState.screen === "scoreboard") {
    console.log("resetGame() bloqué : affichage du tableau des scores");
    return;
  }

  confirmBtn.removeEventListener("click", resetGame);
  confirmZone.classList.add("is-hidden");

  const savedOptions = { ...gameOptions };

  console.log("Désactivation des systèmes de jeu");

  // Désactiver les mécaniques de jeu
  disableEnemyShooting();
  disableMovement();
  disableShooting();
  disablePowerUps();

  // Arrêter les timers
  pauseTimer();
  removeTimer();
  stopPowerUpTimer();

  // Arrêter les cinématiques
  pauseCutscene();

  console.log("Destruction du carousel...");
  stopCarousel();
  destroyCarousel();
  enemiesRegistry.length = 0;

  console.log("Réinitialisation des données");
  Object.assign(gameData, defaultData);
  Object.assign(lastLevel, defaultLevel);
  Object.assign(gameOptions, savedOptions);

  console.log("Nettoyage du DOM");
  resetSteps();

  console.log("Nettoyage des cinématiques");
  cutsceneDeleteCoworkers();
  typeZone.textContent = "";
  cutsceneAnimation.innerHTML = "";
  const partyLights = document.getElementById("party-lights");
  if (partyLights) partyLights.remove();
  const managers = document.getElementById("managers");
  if (managers) managers.remove();

  console.log("Masquage des écrans");
  gameScreen.classList.add("is-hidden");
  HUD.classList.add("is-hidden");
  endLvl.classList.add("is-hidden");
  sceneZone.classList.add("is-hidden");

  console.log("Arrêt de la musique");
  stopMusic();
  gameData.currentMusic = "main-menu";

  console.log("Chargement du menu principal");
  loadMainMenu();
}

/**
 * Fonction auxiliaire pour nettoyer les éléments du jeu
 * Appelée par resetGame() et restartLevel()
 */
function resetSteps() {
  // Réinitialiser la position et le style du joueur
  playerIcon.style.removeProperty("left");
  playerIcon.style.removeProperty("transform");
  playerIcon.classList.remove("player--hit");

  // Vider les conteneurs HTML
  enemyLines.innerHTML = "";
  projectiles.innerHTML = "";
  powerupsZone.innerHTML = "";
  gameMessage.textContent = "";

  // Désactiver tous les systèmes
  disableEnemyShooting();
  disableMovement();
  disableShooting();
  disablePowerUps();
  pauseTimer();
  removeTimer();
  pauseCutscene();
}

/**
 * Fonction pour recommencer le niveau en cours
 * Réinitialise les données au dernier checkpoint sauvegardé
 */
function restartLevel() {
  confirmBtn.removeEventListener("click", restartLevel);
  confirmZone.classList.add("is-hidden");

  gameData.score = lastLevel.score;
  gameData.lives = lastLevel.lives;
  gameData.powerups = [...lastLevel.powerups];

  resetSteps();
  const { resumeGame } = require("./pause.js");
  const { loadLevel } = require("../engine/levels.js");

  resumeGame();
  loadLevel();
}

export { resetGame, restartLevel };
