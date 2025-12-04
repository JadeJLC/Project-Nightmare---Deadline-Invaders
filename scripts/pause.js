import { stopMusic, playMusic } from "./audio.js";
import { resetGame, restartLevel } from "./checkpoints.js";
import {
  musicBtn,
  menu,
  confirmBtn,
  confirmZone,
  closeConfirm,
} from "./variables.js";

let currentEvent = "main-menu";

// Gestion du menu pause

function openSettingsMenu() {
  pauseMenu("settings");
}

function openPauseMenu() {
  pauseMenu("pause");
}

function pauseMenu(type) {
  console.log("Ouverture du menu");
  menu.classList.toggle("is-hidden");
  console.log(menu.classList);

  switch (type) {
    case "settings":
      menu.querySelector("h2").textContent = "Paramètres";
      menu.querySelector("div").classList.add("is-hidden");
      console.log("Ouverture du menu paramètres");
      break;
    case "pause":
      menu.querySelector("h2").textContent = "Pause";
      menu.querySelector("div").classList.remove("is-hidden");
      console.log("Ouverture du menu pause");
      break;
  }

  closeConfirm.addEventListener("click", cancelConfirm);
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

function confirmRestart() {
  menu.querySelector("div").classList.add("is-hidden");
  document.getElementById("alert").textContent =
    "Recommencer le niveau ? Toute votre progression sur ce niveau sera perdue.";

  confirmZone.classList.remove("is-hidden");
  confirmBtn.addEventListener("click", restartLevel);
}

function confirmReset() {
  menu.querySelector("div").classList.add("is-hidden");
  document.getElementById("alert").textContent =
    "Attention ! Toute progression sera perdue si vous revenez au menu principal.";

  confirmZone.classList.remove("is-hidden");
  confirmBtn.addEventListener("click", resetGame);
}

function cancelConfirm() {
  menu.querySelector("div").classList.remove("is-hidden");
  confirmZone.classList.add("is-hidden");
  confirmBtn.removeEventListener("click", resetGame);
  confirmBtn.removeEventListener("click", restartLevel);
}

export {
  pauseMenu,
  openPauseMenu,
  openSettingsMenu,
  confirmReset,
  confirmRestart,
};
