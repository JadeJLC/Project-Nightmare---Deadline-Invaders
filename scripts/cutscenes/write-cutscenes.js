import { typeZone, gameData, sceneZone, skipBtn } from "../variables.js";
import { soundEffect } from "../audio/sound-effects.js";
import { skipCutscene, fastSkip } from "./skip-cutscene.js";
import { loadLevel } from "../engine/levels.js";
import { specialLines } from "./special-scenes.js";
import { cutsceneDeleteCoworkers } from "./images-cutscenes.js";
import { endGame } from "../engine/levels.js";

let currentLetter = 0;
let isTyping = false;
let pressEnter = null;
let typewriterTimeout = null;

let cutsceneData = {
  textList: [],
  currentLine: 0,
};

function advanceCutScene(cutsceneTextList) {
  skipBtn.addEventListener("click", skipCutscene);
  document.addEventListener("keydown", fastSkip);

  cutsceneData.textList = cutsceneTextList;
  cutsceneData.currentLine = 0;

  if (pressEnter) {
    document.removeEventListener("keydown", pressEnter);
  }

  pressEnter = (e) => {
    e.preventDefault();
    if (e.code === "Enter" && !isTyping) {
      soundEffect("beep");
      nextLine();
    }
  };

  document.addEventListener("keydown", pressEnter);
  nextLine();
}

function endCutscene() {
  console.log("Cutscene finished.");
  gameData.loadedCutscene = true;
  sceneZone.classList.add("is-hidden");
  typeZone.textContent = "";

  document.removeEventListener("keydown", fastSkip);
  document.removeEventListener("keydown", pressEnter);

  cutsceneDeleteCoworkers();

  clearTimeout(typewriterTimeout);
  typewriterTimeout = null;

  if (gameData.currentLevel <= 3) {
    loadLevel();
  } else {
    endGame();
  }
}

function nextLine(skip) {
  if (cutsceneData.currentLine >= cutsceneData.textList.length || skip) {
    endCutscene();
    return;
  }

  specialLines();

  isTyping = true;
  typeWriter(cutsceneData.textList[cutsceneData.currentLine], () => {
    isTyping = false;
    cutsceneData.currentLine++;
  });
}

// Gestion de l'affichage lettre par lettre
function typeWriter(txt, onComplete) {
  if (currentLetter === 0) {
    typeZone.textContent = "";
  }

  if (currentLetter < txt.length) {
    typeZone.textContent += txt[currentLetter];
    if (currentLetter % 4 === 0) {
      soundEffect("text-sound-effect");
    }
    currentLetter++;
    typewriterTimeout = setTimeout(() => {
      typeWriter(txt, onComplete);
    }, 25);
  } else {
    typeZone.innerHTML += '<span class="blink"> ▼</span>';
    currentLetter = 0;
    if (onComplete) {
      onComplete();
    }
  }
}

export { advanceCutScene, cutsceneData, nextLine };
