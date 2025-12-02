import { typeZone, gameData, sceneZone } from "../variables.js";
import { changeMusic, soundEffect } from "../audio.js";

let currentLetter = 0;
let currentLine = 0;
let isTyping = false;
let textList = [];
let pressEnter = null;

function advanceCutScene(initialTextList) {
  textList = initialTextList;
  currentLine = 0;

  // Supprimer l'ancien écouteur s'il existe
  if (pressEnter) {
    document.removeEventListener("keydown", pressEnter);
  }

  // Créer le nouvel écouteur
  pressEnter = (e) => {
    if (e.code === "Enter" && !isTyping) {
      soundEffect("sound-effects/beep");
      e.preventDefault();
      nextLine();
    }
  };

  document.addEventListener("keydown", pressEnter);
  nextLine();
}

function nextLine() {
  if (currentLine >= textList.length) {
    console.log("Cutscene finished.");
    document.removeEventListener("keydown", pressEnter);
    sceneZone.classList.add("is-hidden");
    let newMusic = `level${gameData.currentLevel}`;
    changeMusic(newMusic);
    return;
  }

  if (textList[currentLine] === `__PROMPT__`) {
    gameData.relouName = prompt("Entrez le nom de votre collègue relou");
    while (
      gameData.relouName === "" ||
      gameData.relouName === gameData.playerName
    ) {
      gameData.relouName = prompt(
        "Nom invalide : déjà utilisé par le joueur ou vide. Entrez le nom de votre collègue relou"
      );
    }
    textList = completeIntroText(textList);
    currentLine++;
    nextLine();
    return;
  }

  isTyping = true;
  typeWriter(textList[currentLine], () => {
    isTyping = false;
    currentLine++;
  });
}

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

function completeIntroText(textList) {
  textList.push(
    `(Patron) : ${gameData.relouName} va travailler avec vous dès aujourd'hui. Je suis sûr que tout se passera très bien.`
  );
  textList.push(
    `(${gameData.relouName}) : Si tout le monde travaille correctement, il ne devrait pas y avoir de problème, hahaha.`
  );
  textList.push(`(${gameData.playerName}) : ...`);

  return textList;
}

export { advanceCutScene };
