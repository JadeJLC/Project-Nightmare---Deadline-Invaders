import { openPauseMenu, openSettingsMenu } from "../menus/pause.js";
import { musicBox, gameData, gameOptions } from "../variables.js";

function selectMusic(musicName) {
  return `../musiques/${musicName}.mp3`;
}

function playMusic(musicName) {
  if (!gameOptions.musicOn) {
    console.log("Musique désactivée");
    return;
  }
  const musicPath = selectMusic(musicName);

  musicBox.src = musicPath;
  musicBox.play().catch((err) => {
    if (err.name !== "AbortError") {
      console.error("Erreur à la lecture de la musique :", err);
    }
    if (err.name === "Not Allowed") {
      gameOptions.musicOn = false;
      if ((gameData.currentMusic = "main-menu")) {
        openSettingsMenu();
      } else {
        openPauseMenu();
      }
    }
  });
}

function stopMusic() {
  musicBox.pause();
  musicBox.currentTime = 0;
}

function changeMusic() {
  stopMusic();
  playMusic(gameData.currentMusic);
}

export { selectMusic, changeMusic, playMusic, stopMusic };
