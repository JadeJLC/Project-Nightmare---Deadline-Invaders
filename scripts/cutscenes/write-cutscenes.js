import { typeZone, gameData, sceneZone, skipBtn } from "../variables.js";
import { changeMusic } from "../audio/music.js";
import { soundEffect } from "../audio/sound-effects.js";
import { skipCutscene, fastSkip } from "./skip-cutscene.js";
import { enableShooting } from "../mechanics/shooting.js";
import { enableEnemyShooting } from "../mechanics/enemy-shooting.js";

let currentLetter = 0;
let currentLine = 0;
let isTyping = false;
let textList = [];
let pressEnter = null;

function advanceCutScene(cutsceneTextList) {
  skipBtn.addEventListener("click", skipCutscene);
  document.addEventListener("keydown", fastSkip);

  textList = cutsceneTextList;
  currentLine = 0;

  if (pressEnter) {
    document.removeEventListener("keydown", pressEnter);
  }

  pressEnter = (e) => {
    e.preventDefault();
    if (e.code === "Enter" && !isTyping) {
      soundEffect("sound-effects/beep");
      nextLine();
    }
  };

  document.addEventListener("keydown", pressEnter);
  nextLine();
}

function nextLine(skip) {
  if (currentLine >= textList.length || skip) {
    console.log("Cutscene finished.");
    gameData.loadedCutscene = true;
    sceneZone.classList.add("is-hidden");

    document.removeEventListener("keydown", fastSkip);
    document.removeEventListener("keydown", pressEnter);

    let newMusic = `level${gameData.currentLevel}`;
    changeMusic(newMusic);
    enableShooting();
    enableEnemyShooting();
    return;
  }

  if (textList[currentLine] === `__PROMPT__`) {
    textList = completeIntroText();
    currentLine++;
    nextLine();
  }

  isTyping = true;
  typeWriter(textList[currentLine], () => {
    isTyping = false;
    currentLine++;
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
      soundEffect("sound-effects/text-sound-effect");
    }
    currentLetter++;
    setTimeout(() => {
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

// Gestion du cas spécial de la cinématique d'introduction : entrer le nom du collègue puis l'intégrer aux dialogues
function completeIntroText() {
  gameData.relouName = prompt("Entrez le nom de votre collègue relou :");
  while (
    gameData.relouName === "" ||
    gameData.relouName === gameData.playerName
  ) {
    gameData.relouName = prompt(
      "Votre collègue ne peut avoir un nom vide ou identique au vôtre. Entrez le nom de votre collègue relou :"
    );
  }
  textList.push(
    `(Patron) : ${gameData.relouName} va travailler avec vous dès aujourd'hui. Je suis sûr que tout se passera très bien.`
  );
  textList.push(
    `(${gameData.relouName}) : Si tout le monde travaille correctement, il ne devrait pas y avoir de problème, hahaha.`
  );
  textList.push(`(${gameData.playerName}) : ...`);

  return textList;
}

export { advanceCutScene, textList, nextLine };
