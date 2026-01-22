import { cutsceneAnimation, gameData, gameOptions } from "../variables.js";
import { cutsceneData, nextLine, resumeCutscene } from "./write-cutscenes.js";

let lastFrameTime = 0;
let relouLeaveAnimationID;
const duration = 180;

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
    if (boss.style) {
      boss.style.transform = "";
    } else {
      boss.style.transform = "scaleX(-1)";
    }
    cutsceneData.currentLine++;
  }
}

// Début de la cinématique d'introduction
// ---- Entrer le nom du collègue puis l'intégrer aux dialogues
function completeIntroText() {
  let bossName = ["(Patron)", ""];
  if (gameOptions.map === 1) bossName = ["(Patronne)", "e"];

  cutsceneData.textList.push(
    `${bossName[0]} : ${gameData.relouName} va travailler avec vous dès aujourd'hui. Je suis sûr${bossName[1]} que tout se passera très bien.`,
  );
  cutsceneData.textList.push(`__BOSSTURN__`);
  cutsceneData.textList.push(
    `(${gameData.relouName}) : Si tout le monde travaille correctement, il ne devrait pas y avoir de problème, hahaha.`,
  );
  cutsceneData.textList.push(`(${gameData.playerName}) : ...`);

  resumeCutscene();
  nextLine();
}

// Départ du collègue relou pendant la cinématique de fin
function animateRelou(timestamp) {
  if (timestamp - lastFrameTime >= duration) {
    lastFrameTime = timestamp;

    finalSceneRelouLeave();
  }

  relouLeaveAnimationID = requestAnimationFrame(animateRelou);
}

let countstep = 0;

function finalSceneRelouLeave() {
  let relou = document.getElementById("cwr");

  if (!relou) return;

  let relouLeftPosition = relou.getBoundingClientRect().left;
  const containerBorders = cutsceneAnimation.getBoundingClientRect();

  if (relouLeftPosition < containerBorders.right && countstep <= 15) {
    let newStep = parseFloat(relou.style.left || 0) + 5;
    relou.style.left = `${newStep}px`;
    countstep++;
  } else {
    cancelAnimationFrame(relouLeaveAnimationID);
    relou.remove();
  }
}

export {
  moveCharacters,
  hideAllCoworkers,
  showAllCoworkers,
  completeIntroText,
  animateRelou,
};
