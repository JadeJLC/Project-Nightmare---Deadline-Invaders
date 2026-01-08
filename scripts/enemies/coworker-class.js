import { createRelou, createCoworkers } from "./coworker-images.js";
import { coworkerID } from "./lines-builder.js";
import { enemiesRegistry } from "../variables.js";
import { soundEffect } from "../audio/sound-effects.js";

class Coworker {
  constructor(x, y) {
    this.x = x;
    this.type = "coworker";
    this.baseY = y; // position de base
    this.wavePhase = Math.random() * Math.PI * 2; // phase aléatoire
    this.el = document.createElement("img");
    this.el.src = "/images/empty.png";
    this.el.className = "enemy";
    this.el.id = `cw${coworkerID}`;
    this.el.style.backgroundPosition = `-${createCoworkers()}px 0px`;
    this.isAlive = true;
    document.getElementById("enemy-carousel").appendChild(this.el);
    enemiesRegistry.push(this);
    this.updatePosition();
  }

  updatePosition() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  update(direction, cfg) {
    const speed = cfg.moveSpeedX;
    this.x += direction === "right" ? speed : -speed;

    if (this.x > cfg.screenWidth) {
      this.x = -this.el.width;
    } else if (this.x < -this.el.width) {
      this.x = cfg.screenWidth;
    }

    // Oscillation verticale
    const amplitude = 8; // pixels
    const frequency = 0.002; // vitesse de l’oscillation
    const time = Date.now();
    this.y =
      this.baseY + amplitude * Math.sin(this.wavePhase + time * frequency);

    this.updatePosition();
  }

  hit() {
    this.isAlive = false;
    if (this.el) {
      this.el.remove(); // supprime du DOM
    }
    if (
      this.el.style.backgroundPosition == "-48px 0px" ||
      this.el.style.backgroundPosition == "0px 0px"
    ) {
      soundEffect("tir-cwf");
    } else {
      soundEffect("tir-cwm");
    }
  }
}

class Relou {
  constructor(x, y, name) {
    this.x = x;
    this.type = "relou";
    this.baseY = y; // position de base
    this.wavePhase = Math.random() * Math.PI * 2; // phase aléatoire
    this.sprite = createRelou(name);
    this.el = document.createElement("img");
    this.el.src = this.sprite;
    this.el.className = "enemy";
    this.el.style.backgroundPosition = "-240px 0px";
    this.isAlive = true;
    this.isRelou = true;
    enemiesRegistry.push(this);
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

    // Oscillation verticale
    const amplitude = 8; // pixels
    const frequency = 0.002; // vitesse de l’oscillation
    const time = Date.now();
    this.y =
      this.baseY + amplitude * Math.sin(this.wavePhase + time * frequency);

    this.updatePosition();
  }

  hit() {
    soundEffect("tir-relou");
  }
}

export { Coworker, Relou };
