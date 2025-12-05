import { createRelou, createCoworkers } from "./collegues.js";
import { gameData, level1Data, gameScreen } from "./variables.js";

function createGameScreen() {
  const gameScreenWidth = window
    .getComputedStyle(gameScreen)
    .getPropertyValue("width");

  window.addEventListener("resize", createGameScreen);

  screenConfig.screenWidth = parseInt(gameScreenWidth);
  const availableWidth = screenConfig.screenWidth - 200;
  screenConfig.enemySpacingX =
    availableWidth / (screenConfig.enemiesPerLine - 1);
  if (screenConfig.enemySpacingX < 30) screenConfig.enemySpacingX = 30;

  if (window.innerHeight > window.innerWidth) {
    screenConfig.speed = 0.03;
    gameData.speed = 3;
  } else {
    screenConfig.speed = 2;
    gameData.speed = 5;
  }
}

class Coworker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = createCoworkers();
    this.el = document.createElement("img");
    this.el.src = this.sprite;
    this.el.className = "enemy";
    this.isAlive = true;
    document.getElementById("enemy-carousel").appendChild(this.el);
    this.updatePosition();
  }

  updatePosition() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  update(direction, cfg) {
    const speed = cfg.moveSpeedX;
    this.x += direction === "right" ? speed : -speed;

    // wrap horizontal
    if (this.x > cfg.screenWidth) {
      this.x = -this.el.width;
    } else if (this.x < -this.el.width) {
      this.x = cfg.screenWidth;
    }

    this.updatePosition();
  }

  hit() {
    this.isAlive = false;
    this.el.style.display = "none";
  }
}

class Relou {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.sprite = createRelou(name);
    this.el = document.createElement("img");
    this.el.src = this.sprite;
    this.el.className = "enemy";
    this.isAlive = true;
    this.isRelou = true;
    document.getElementById("enemy-carousel").appendChild(this.el);
    this.updatePosition();
  }

  updatePosition() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  update(direction, cfg) {
    const speed = cfg.moveSpeedX;
    this.x += direction === "right" ? speed : -speed;

    // wrap horizontal
    if (this.x > cfg.screenWidth) {
      this.x = -this.el.width;
    } else if (this.x < -this.el.width) {
      this.x = cfg.screenWidth;
    }

    this.updatePosition();
  }

  hit() {
    console.log("Relou ne peut pas être éliminé !");
  }
}

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

const screenConfig = {
  screenWidth: 800,
  enemiesPerLine: 12,
  enemySpacingX: 70, // Sera recalculé dans createGameScreen
  lineSpacingY: 60,
  moveSpeedX: 2,
};

function newCarousel() {
  createGameScreen();
  console.log(
    `Largeur écran: ${screenConfig.screenWidth}, Espacement: ${screenConfig.enemySpacingX}`
  );
  const carousel = new EnemyCarousel(screenConfig, level1Data);
  return carousel;
}

function enemyLoop(carousel) {
  carousel.update();
  requestAnimationFrame(() => enemyLoop(carousel));
}

export { enemyLoop, newCarousel };
