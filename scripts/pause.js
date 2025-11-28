import { stopMusic, playMusic } from "./audio.js";
import { musicBtn } from "./variables.js";

let currentEvent = "main-menu";

// Gestion du menu pause
const menu = document.getElementById("pause-menu");

function pauseMenu(type) {
  console.log("Ouverture du menu");
  menu.classList.toggle("is-hidden");

  switch (type) {
    case "settings":
      menu.querySelector("h2").textContent = "Paramètres";
      menu.querySelector("div").classList.add("is-hidden");
      break;
    case "pause":
      menu.querySelector("h2").textContent = "Pause";
      menu.querySelector("div").classList.remove("is-hidden");
      break;
  }
  // ---- Ouvre le menu et met le jeu en pause
}

function resumeGame() {
  menu.classList.add("is-hidden");
  // ---- Ferme le menu et relance le jeu
}

musicBtn.addEventListener("click", toggleMusic);

function toggleMusic() {
  let turnMusicOn = musicBtn.classList.toggle("music-on");

  if (turnMusicOn) {
    console.log("Lecture de la musique");
    musicBtn.textContent = "🎵 / Couper la musique";
    playMusic(currentEvent);
  } else {
    console.log("Arrêt de la musique");
    musicBtn.textContent = "🔇 / Activer la musique";
    stopMusic();
  }
}

export { pauseMenu };
