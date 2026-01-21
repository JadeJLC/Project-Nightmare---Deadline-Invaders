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

// #region ---- Ecriture du texte de la cinématique
function advanceCutScene(cutsceneTextList) {
  skipBtn.addEventListener("click", skipCutscene);

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

function nextLine(skip) {
  if (cutsceneData.currentLine >= cutsceneData.textList.length || skip) {
    endCutscene();
    return;
  }

  document.addEventListener("keydown", fastSkip);
  skipBtn.classList.remove("is-hidden");

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

// #endregion

// #region ---- Gestion de la pause, fin et redémarrage de la cinématique
function endCutscene() {
  console.log("Cutscene finished.");
  gameData.loadedCutscene = true;
  sceneZone.classList.add("is-hidden");
  typeZone.textContent = "";

  document.removeEventListener("keydown", pressEnter);
  document.removeEventListener("keydown", fastSkip);

  cutsceneDeleteCoworkers();

  clearTimeout(typewriterTimeout);
  typewriterTimeout = null;

  if (gameData.lives === 0) {
    endGame();
  } else if (gameData.currentLevel <= 3) {
    loadLevel();
  } else {
    endGame();
  }
}

function pauseCutscene() {
  document.removeEventListener("keydown", pressEnter);
  document.removeEventListener("keydown", fastSkip);
}

function resumeCutscene() {
  document.addEventListener("keydown", pressEnter);
  document.addEventListener("keydown", fastSkip);
}

// #endregion

export {
  advanceCutScene,
  cutsceneData,
  nextLine,
  pauseCutscene,
  resumeCutscene,
};
