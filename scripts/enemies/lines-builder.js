import { Coworker, Relou } from "./coworker-class.js";
import { gameData } from "../variables.js";

let coworkerID = 0;

class EnemyLine {
  constructor(y, direction, cfg, relouCount, lineIndex) {
    this.direction = direction;
    this.cfg = cfg;
    this.speedMultiplier = 0.9 + Math.random() * 0.2;
    this.enemies = this.createEnemies(y, direction, cfg, relouCount, lineIndex);
  }

  createEnemies(y, direction, cfg, relouCount, lineIndex) {
    const { enemiesPerLine, enemySpacingX, screenWidth } = cfg;

    // Calculer la position de départ pour centrer tous les ennemis
    const totalWidth = (enemiesPerLine - 1) * enemySpacingX;
    const startX = (screenWidth - totalWidth) / 2;

    // Décalage pour désynchroniser les lignes (mais tous les ennemis restent visibles)
    const offset = lineIndex * enemySpacingX * 0.15;

    const relouPositions = new Set();
    while (relouPositions.size < relouCount) {
      relouPositions.add(Math.floor(Math.random() * enemiesPerLine));
    }

    return Array.from({ length: enemiesPerLine }, (_, i) => {
      const x = startX + i * enemySpacingX + offset;
      coworkerID++;
      if (relouPositions.has(i)) {
        return new Relou(x, y, gameData.relouName);
      } else {
        return new Coworker(x, y);
      }
    });
  }

  update() {
    const modifiedCfg = {
      ...this.cfg,
      moveSpeedX: this.cfg.moveSpeedX * this.speedMultiplier,
    };

    const time = Date.now();
    this.enemies.forEach((e) => {
      if (e.isAlive) {
        e.update(this.direction, modifiedCfg, time);
      }
    });
  }

  getEnemies() {
    return this.enemies.filter((e) => e.isAlive);
  }

  onlyRelous() {
    // On récupère uniquement les coworkers
    const coworkers = this.enemies.filter((e) => e.type === "coworker");

    // Si au moins un coworker est encore vivant → false
    if (coworkers.some((cw) => cw.isAlive)) {
      return false;
    }

    // Sinon (aucun coworker vivant), il ne reste que des relous → true
    return true;
  }
}

class EnemyCarousel {
  constructor(cfg, levelConfig) {
    this.cfg = cfg;
    this.lines = this.createLines(levelConfig);
    this.activePowerUp = null;
  }

  createLines(levelConfig) {
    return Array.from({ length: levelConfig.lineCount }, (_, i) => {
      const y = 20 + i * this.cfg.lineSpacingY;
      const direction = i % 2 === 0 ? "right" : "left";
      return new EnemyLine(y, direction, this.cfg, levelConfig.relouPerLine, i);
    });
  }

  createLine(lineIndex) {
    const y = 60; // position de départ en haut
    const direction = lineIndex % 2 === 0 ? "right" : "left";
    return new EnemyLine(
      y,
      direction,
      this.cfg,
      this.levelConfig.relouPerLine,
      lineIndex,
    );
  }

  update() {
    this.lines.forEach((line) => line.update());
  }

  getAllEnemies() {
    return this.lines.flatMap((line) => line.getEnemies());
  }
}

export { EnemyLine, EnemyCarousel, coworkerID };
