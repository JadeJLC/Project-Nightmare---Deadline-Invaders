import {
  createCarousel,
  startCarousel,
  getCarousel,
} from "../enemies/enemies.js";
import { EnemyLine } from "../enemies/lines-builder.js";
import {
  enableEnemyShooting,
  resumeEnemyShots,
} from "../mechanics/enemy-shooting.js";
import { enableShooting } from "../mechanics/player-shooting.js";
import { allLevelData, gameData } from "../variables.js";
import { enableMovement } from "../mechanics/player-movement.js";
import {
  updateProgressScore,
  initProgressDisplay,
} from "../scores/progress-bar.js";
import { changeMusic } from "../audio/music.js";
import { closeRules } from "../menus/rules.js";

class EndlessMode {
  constructor(carousel, levelConfig) {
    this.carousel = carousel;
    this.levelConfig = levelConfig;
    this.spawnY = 60;
  }

  update() {
    // 1. Mettre à jour les lignes existantes
    this.carousel.update();

    // 2. Nettoyer les lignes sans coworkers vivants
    this.carousel.lines.forEach((line) => {
      const coworkersAlive = line.enemies.some(
        (e) => e.type === "coworker" && e.isAlive
      );
      if (!coworkersAlive) {
        line.enemies.forEach((e) => {
          if (e.type === "relou") {
            e.isAlive = false;
            if (e.el) e.el.remove();
          }
        });
        line.enemies = line.enemies.filter((e) => e.isAlive);
      }
    });

    // 3. Retirer les lignes vides
    this.carousel.lines = this.carousel.lines.filter(
      (line) => !line.onlyRelous()
    );

    // 4. Ajouter de nouvelles lignes si nécessaire
    while (this.carousel.lines.length < this.levelConfig.lineCount) {
      this.descendLines();
      this.addNewLine();
    }
  }

  descendLines() {
    this.carousel.lines.forEach((line) => {
      line.enemies.forEach((enemy) => {
        enemy.baseY += this.carousel.cfg.lineSpacingY;
      });
    });
  }

  addNewLine() {
    const index = this.carousel.lines.length;
    const direction = index % 2 === 0 ? "right" : "left";
    const newLine = new EnemyLine(
      this.spawnY,
      direction,
      this.carousel.cfg,
      this.levelConfig.relouPerLine,
      0
    );
    this.carousel.lines.unshift(newLine);
  }

  setLevelConfig(nextConfig) {
    this.levelConfig = nextConfig;
  }
}

// ===== INSTANCE GLOBALE =====
let endlessInstance = null;
let currentLevelConfig = allLevelData[1];

// ===== FONCTION DE UPDATE PERSONNALISÉE =====
function endlessUpdate(carousel) {
  if (!endlessInstance) return;

  // Adapter la difficulté selon le score
  const score = gameData.goodScore - gameData.badScore;
  if (score > 200 && score <= 400) {
    endlessInstance.setLevelConfig(allLevelData[2]);
  } else if (score > 400) {
    endlessInstance.setLevelConfig(allLevelData[3]);
  }

  // Mettre à jour le mode endless
  endlessInstance.update();
}

// ===== DÉMARRAGE =====
function startEndless() {
  closeRules();
  gameData.currentMusic = "level2";
  changeMusic();
  console.log("🎮 Démarrage du mode Endless");

  // Créer le carousel
  const carousel = createCarousel(currentLevelConfig);

  // Créer l'instance Endless
  endlessInstance = new EndlessMode(carousel, currentLevelConfig);

  // Reset état du jeu
  gameData.badScore = 0;
  gameData.goodScore = 0;
  gameData.countPoint = true;

  // Activer les contrôles et tirs
  enableShooting();
  enableEnemyShooting();
  enableMovement();
  resumeEnemyShots();

  // Initialiser l'affichage du score
  initProgressDisplay();
  updateProgressScore();

  // Démarrer le carousel avec la fonction de update personnalisée
  startCarousel(endlessUpdate);

  console.log("✅ Mode Endless démarré");
}

// ===== NETTOYAGE =====
function cleanupEndless() {
  endlessInstance = null;
  currentLevelConfig = allLevelData[1];
  console.log("🧹 Nettoyage du mode Endless");
}

export { startEndless, cleanupEndless };
