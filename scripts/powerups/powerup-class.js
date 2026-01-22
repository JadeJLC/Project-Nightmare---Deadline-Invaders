import { tutoPowerUps } from "../tutorials/tuto-powerups.js";
import { gameData, gameOptions, enemiesRegistry } from "../variables.js";
import { displayPowerUps } from "./display-powerups.js";
import { pausePowerUpMove } from "./powerup-move.js";
import { powerUpData, powerUpList } from "./powerup-spawn.js";
import { floatingPowerUp } from "./powerup-spawn.js";
import { resumePowerUpTimeout } from "./powerup-timer.js";

export class PowerUp {
  constructor(x, y, direction) {
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.currentDir = direction;
    this.isAlive = true;

    this.type = "powerup";
    this.wavePhase = Math.random() * Math.PI * 2;

    this.el = document.createElement("img");
    this.el.src = "/images/empty.png";
    this.el.id = "powerup-float";
    this.el.className = "mini-tile";
    this.el.classList.add(powerUpData.type);

    enemiesRegistry.push(this);
    document.getElementById("enemy-carousel").appendChild(this.el);
    this.updatePosition();
  }

  updatePosition() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  update(cfg) {
    const direction = this.currentDir;
    const speed = 3;
    this.x += direction === "right" ? speed : -speed;

    if (this.x > cfg.screenWidth && direction === "right") {
      this.disapear();
    } else if (this.x < -this.el.width && direction === "left") {
      this.disapear();
    }

    // Oscillation verticale
    const amplitude = 20; // pixels
    const frequency = 0.002; // vitesse de l’oscillation
    const time = Date.now();
    this.y =
      this.baseY + amplitude * Math.sin(this.wavePhase + time * frequency);

    this.updatePosition();
  }

  hit() {
    console.log("Powerup Touché ! Ajout à la liste des powerup");
    gameData.powerups.push(powerUpData.name);
    powerUpMessage(powerUpData.name);
    this.disapear();
  }

  disapear() {
    pausePowerUpMove();
    this.el.remove();

    floatingPowerUp.isThere = false;
    this.isAlive = false;
  }
}

function powerUpMessage(searchName) {
  displayPowerUps();
  if (!gameOptions.tutos) return;
  const powerUp = powerUpList.find((item) => item.name === searchName);

  if (powerUp) {
    if (powerUp.tutorial) return;

    if (!powerUp.tutorial) {
      let popUpMessage = `Vous avez obtenu un nouveau powerup : <b>${powerUp.name} !</b><br><br>
    ${powerUp.effect}<br>
    Vous pouvez l'activer à tout moment en appuyant sur la touche [${powerUp.key}]`;

      // Ajouter la fonction pour l'ouverture de la popup (met en pause le jeu, affiche le message, permet de fermer la popup en appuyant sur entrée)

      powerUp.tutorial = true;
      tutoPowerUps(popUpMessage);
    }
  }
}
