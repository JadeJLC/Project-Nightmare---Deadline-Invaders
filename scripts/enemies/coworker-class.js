import { createRelou, createCoworkers } from "./coworker-images.js";

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

export { Coworker, Relou };
