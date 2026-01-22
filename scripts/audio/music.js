import { openPauseMenu, openSettingsMenu } from "../menus/pause.js";
import { musicBox, gameData, gameOptions } from "../variables.js";

function selectMusic(musicName) {
  return `../musiques/${musicName}.mp3`;
}

function playMusic(musicName, n) {
  if (!gameOptions.musicOn) {
    return;
  }
  const musicPath = selectMusic(musicName);

  musicBox.src = musicPath;
  musicBox.play().catch((err) => {
    console.error("Erreur à la lecture de la musique :", err);

    if (err.name === "NotAllowedError") {
      gameOptions.musicOn = false;
      if ((gameData.currentMusic = "main-menu")) {
        openSettingsMenu();
      } else {
        openPauseMenu();
      }
    }
  });

  if (n && musicBox.currentTime < n) musicBox.currentTime = n;
}

function stopMusic() {
  musicBox.pause();
  musicBox.currentTime = 0;
}

function changeMusic(n) {
  stopMusic();

  playMusic(gameData.currentMusic, n);
}

export { selectMusic, changeMusic, playMusic, stopMusic };
