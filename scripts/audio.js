import { audioElement } from "./variables.js";

// Sélectionne la musique à lancer
function selectMusic(event) {
  return `../musiques/${event}.mp3`;
}

function playMusic(event) {
  const musicPath = selectMusic(event);

  audioElement.src = musicPath;
  audioElement.play().catch((err) => {
    if (err.name !== "AbortError") {
      console.error("Erreur à la lecture de la musique :", err);
    }
  });
}

function soundEffect(event) {
  const effectPath = selectMusic(event);
  const audioBox = document.getElementById("game-screen");
  const audio = document.createElement("audio");
  audio.src = effectPath;
  audio.loop = false;

  audioBox.append(audio);
  audio.play();

  setTimeout(() => {
    audio.remove();
  }, 1000);
}

function stopMusic() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

function changeMusic(newEvent) {
  stopMusic();
  playMusic(newEvent);
}

export { changeMusic, playMusic, stopMusic, soundEffect };
