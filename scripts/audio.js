import { audioElement } from "./variables.js";

// Sélectionne la musique à lancer
function selectMusic(event) {
  return `../musiques/${event}.mp3`;
}

function playMusic(event) {
  const musicPath = selectMusic(event);

  // Charge et joue la musique
  audioElement.src = musicPath;
  audioElement.play().catch((err) => {
    console.error("Erreur à la lecture de la musique :", err);
  });
}

function stopMusic() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

function changeMusic(newEvent) {
  stopMusic();
  playMusic(newEvent);
}

export { changeMusic, playMusic, stopMusic };
