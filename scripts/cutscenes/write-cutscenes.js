import { typeZone, gameData } from "../variables.js";

let currentLetter = 0;
let currentLine = 0;

function advanceCutScene(textList) {
  if (currentLine >= textList.length) {
    console.log("Cutscene finished.");
    return;
  }

  if (textList[currentLine] === `__PROMPT__`) {
    gameData.relouName = prompt("Entrez le nom de votre collègue relou");
    textList = completeIntroText(textList);
    currentLine++;
  }

  let waitTime = 5000;

  typeWriter(textList[currentLine]);
  setTimeout(() => {
    advanceCutScene(textList);
  }, waitTime);
  currentLine++;
}

function typeWriter(txt, onComplete) {
  if (currentLetter === 0) {
    typeZone.textContent = "";
  }

  if (currentLetter < txt.length) {
    typeZone.textContent += txt[currentLetter];
    currentLetter++;
    setTimeout(() => {
      typeWriter(txt);
    }, 25);
  } else {
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
    `${gameData.relouName} : Si tout le monde travaille correctement, il ne devrait pas y avoir de problème, hahaha.`
  );
  textList.push(`${gameData.playerName} : ...`);

  return textList;
}
export { advanceCutScene };
