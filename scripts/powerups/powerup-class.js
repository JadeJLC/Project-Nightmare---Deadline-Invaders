import { gameData, gameOptions } from "../variables.js";
import { powerUpData, powerUpList } from "./powerup-spawn.js";

class PowerUp {
  constructor(x, y, direction) {
    this.x = x;
    this.baseY = y;
    this.currentDir = direction;
    this.isAlive = true;

    this.type = "powerup";
    this.wavePhase = Math.random() * Math.PI * 2;

    this.el = document.createElement("img");
    this.el.src = "/images/empty.png";
    this.el.className = powerUpData.type;

    enemiesRegistry.push(this);
    document.getElementById("enemy-carousel").appendChild(this.el);
    this.updatePosition();
  }

  update(cfg) {
    if (!this.isAlive) return;

    const speed = cfg.moveSpeedX;
    this.x += this.currentDir === "right" ? speed : -speed;

    const time = Date.now();
    this.y = this.baseY + 8 * Math.sin(time * 0.003);

    if (this.x > cfg.screenWidth + 100 || this.x < -100) {
      this.remove();
    }

    this.updatePosition();
  }

  updatePosition() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  hit() {
    gameData.powerups.push(powerUpData.name);
    powerUpMessage(powerUpData.name);
    this.el.remove();

    floatingPowerUp = false;
    this.isAlive = false;
  }
}

function powerUpMessage(searchName) {
  if (!gameOptions.tutos) return;
  const powerUp = powerUpList.find((item) => item.name === searchName);

  if (powerUp) {
    if (powerUp.tutorial) return;

    if (!powerUp.tutorial) {
      let popUpMessage = `Vous avez obtenu un nouveau powerup : ${powerUp.name} !<br>
    ${powerUp.effect}<br>
    Vous pouvez l'activer à tout moment en appuyant sur la touche ${powerUp.key}`;

      // Ajouter la fonction pour l'ouverture de la popup (met en pause le jeu, affiche le message, permet de fermer la popup en appuyant sur entrée)

      powerUp.tutorial = true;
    }
  }
}
