import { Coworker, Relou } from "./coworker-class.js";
import { gameData } from "../variables.js";

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

    this.enemies.forEach((e) => {
      if (e.isAlive) {
        e.update(this.direction, modifiedCfg);
      }
    });
  }

  getEnemies() {
    return this.enemies.filter((e) => e.isAlive);
  }
}

class EnemyCarousel {
  constructor(cfg, levelConfig) {
    this.cfg = cfg;
    this.lines = this.createLines(levelConfig);
  }

  createLines(levelConfig) {
    return Array.from({ length: levelConfig.lineCount }, (_, i) => {
      const y = 60 + i * this.cfg.lineSpacingY;
      const direction = i % 2 === 0 ? "right" : "left";
      return new EnemyLine(y, direction, this.cfg, levelConfig.relouPerLine, i);
    });
  }

  update() {
    this.lines.forEach((line) => line.update());
  }

  getAllEnemies() {
    return this.lines.flatMap((line) => line.getEnemies());
  }
}

export { EnemyLine, EnemyCarousel };
