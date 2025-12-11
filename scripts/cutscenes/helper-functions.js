import { soundEffect } from "../audio/sound-effects.js";
import { cutsceneAnimation, gameData } from "../variables.js";
import { cutsceneData } from "./write-cutscenes.js";

let relouLeaveAnimationID;

// Fonctions pour afficher ou masquer les collègues dans les cinématiques
function hideAllCoworkers() {
  let coworkerID = 1;
  while (coworkerID < 6) {
    let coworker = document.getElementById(`cw${coworkerID}`);

    if (coworker) coworker.classList.add("is-hidden");

    coworkerID++;
  }
}

function showAllCoworkers() {
  let coworkerID = 1;
  while (coworkerID < 6) {
    let coworker = document.getElementById(`cw${coworkerID}`);

    if (coworker) coworker.classList.remove("is-hidden");

    coworkerID++;
  }
}

// Fonction pour les déplacements de personnages
function moveCharacters(line) {
  let boss = document.getElementById("boss");

  // Patron qui se tourne
  if (line === `__BOSSTURN__`) {
    console.log(line);
    if (boss.style) {
      boss.style = "";
    } else {
      boss.style.transform = "scaleX(-1)";
    }
    cutsceneData.currentLine++;
  }
}

// Début de la cinématique d'introduction
// ---- Entrer le nom du collègue puis l'intégrer aux dialogues
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
  cutsceneData.textList.push(
    `(Patron) : ${gameData.relouName} va travailler avec vous dès aujourd'hui. Je suis sûr que tout se passera très bien.`
  );
  cutsceneData.textList.push(`__BOSSTURN__`);
  cutsceneData.textList.push(
    `(${gameData.relouName}) : Si tout le monde travaille correctement, il ne devrait pas y avoir de problème, hahaha.`
  );
  cutsceneData.textList.push(`(${gameData.playerName}) : ...`);
}

// Départ du collègue relou pendant la cinématique de fin
function animateRelou(timestamp) {
  if (timestamp - lastFrameTime >= duration) {
    lastFrameTime = timestamp;

    finalSceneRelouLeave();
  }

  animationFrameId = requestAnimationFrame(animateRelou);
}

function finalSceneRelouLeave() {
  let countstep = 0;
  let relou = document.getElementById("cwr");

  let relouLeftPosition = relou.getBoundingClientRect().left;
  const containerBorders = cutsceneAnimation.getBoundingClientRect();

  if (
    relou &&
    relouLeftPosition < containerBorders.width - containerBorders.left &&
    countstep <= 5
  ) {
    relouLeftPosition += 5;
    relou.style.left = `${relouLeftPosition}px`;
    countstep++;
  } else {
    cancelAnimationFrame(animateRelou);
    relou.classList.remove();
  }
}

export {
  moveCharacters,
  hideAllCoworkers,
  showAllCoworkers,
  completeIntroText,
  finalSceneRelouLeave,
};
