import { selectMusic } from "./music.js";

function soundEffect(soundName) {
  const effectPath = selectMusic(soundName);
  const audioBox = document.getElementById("game-screen");
  const audio = document.createElement("audio");

  audio.src = effectPath;
  audio.loop = false;

  audioBox.append(audio);
  audio.play();

  setTimeout(() => {
    audio.remove();
  }, 3000);
}

export { soundEffect };
