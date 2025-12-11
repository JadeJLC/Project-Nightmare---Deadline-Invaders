import { cutsceneData } from "./write-cutscenes.js";
import { cutsceneAnimation, gameData } from "../variables.js";
import {
  showAllCoworkers,
  hideAllCoworkers,
  moveCharacters,
  completeIntroText,
  finalSceneRelouLeave,
} from "./helper-functions.js";

export function specialLines() {
  let line = cutsceneData.textList[cutsceneData.currentLine];
  let specialLine = cutsceneData.currentLine;
  let boss = document.getElementById("boss");
  let relou = document.getElementById("cwr");
  let managers = document.getElementById("managers");

  if (managers) managers.remove();

  console.log(line);

  // Présentation du collègue
  if (line === `__PROMPT__`) {
    boss.style.transform = "scaleX(-1)";
    completeIntroText();
    cutsceneData.currentLine++;
  }

  // Mouvements des personnages
  if (line === `__BOSSTURN__`) {
    moveCharacters(line);
  }

  if (line.includes(`(${gameData.relouName})`)) {
    relou.style.left = "335px";
  } else if (relou) {
    relou.style.left = "";
  }

  // Scènes où le patron n'est pas là
  if ((line == "") | (line === "__STOP__") | (line === "__BOSSBACK__")) {
    noBoss(line);
  }

  // Discussion entre le patron et le relou
  if (line === "__FIRSTSCENE__" || line === "__ENDSCENE__") {
    secretConversation(line);
  }

  if (line === "__SECONDSCENE__") {
    managementMeeting();
  }

  // Transition entre les scènes
  if (line === "__WAIT__") {
    cutsceneAnimation.classList.add("is-hidden");
    cutsceneData.textList[cutsceneData.currentLine] = " ... (plus tard) ...";
  } else {
    cutsceneAnimation.classList.remove("is-hidden");
  }

  // Dénonciation du collègue relou au patron
  if (line === "__THIRDSCENE__") {
    denonceRelou();
  }

  // Discussions entre le patron et l'équipe
  if (line === "__NORELOU__") {
    relouFired();
  }

  // Discussion entre le patron et le joueur
  if (line === "__PRIVATE__") {
    perfectEnding();
  }

  if (line === "__ENDGAME__") {
    lastWorkDay();
  }

  if (line === "__PARTY__") {
  }

  if (line === "__RELOULEAVE__") {
    relouLeave();
  }

  if (cutsceneData.currentLine != specialLine) specialLines();
}

// #region ---- Fin du premier niveau
// Scène de conversation secrète entre le relou et le boss
// ----- Fait disparaître les autres collègues et déplacent le boss et le relou pour qu'ils discutent
function secretConversation(line) {
  let boss = document.getElementById("boss");
  let relou = document.getElementById("cwr");

  relou.classList.remove("is-hidden");

  // Début de la scène
  if (line === "__FIRSTSCENE__") {
    hideAllCoworkers();

    relou.style.transform = "scaleX(-1)";
    relou.style.left = "50px";
    boss.style.left = "180px";
    boss.style.bottom = "-15px";

    cutsceneData.textList[cutsceneData.currentLine] = `*discute*`;
  }

  // Fin de la scène
  if (line === "__ENDSCENE__") {
    boss.style = "";
    relou.style = "";

    showAllCoworkers();

    cutsceneData.currentLine++;
  }
}
// #endregion

// #region ---- Fin du deuxième niveau

function managementMeeting() {
  hideAllCoworkers();
  let managers = document.createElement("img");
  managers.src = "managers.png";
  managers.title = managers.alt = "Managers";
  managers.id = "managers";

  cutsceneAnimation.appendChild(managers);
  cutsceneData.currentLine++;
}

// #endregion

// #region ---- Fin du troisème niveau
// Scène spéciale si le joueur a un score de 100% à chaque niveau
// ---- Le patron discute avec le joueur en privé
function perfectEnding() {
  let relou = document.getElementById("cwr");
  cutsceneData.textList[cutsceneData.currentLine] = " ... (en privé) ...";

  relou.classList.add("is-hidden");
  hideAllCoworkers();
}

// Scène où le collègue dénonce le collègue relou au patron
// ---- Tous les autres personnages disparaissent pour la discussion en privé
function denonceRelou() {
  let relou = document.getElementById("cwr");
  cutsceneData.textList[cutsceneData.currentLine] = " ... (en privé) ...";

  relou.classList.add("is-hidden");
  hideAllCoworkers();
  let coworker = document.getElementById(`cw2`);

  if (coworker) coworker.classList.remove("is-hidden");
}

// Scène où le patron annonce que le collègue relou a été renvoyé
// --- Tous les personnages sont présents sauf le collègue relou
function relouFired() {
  let relou = document.getElementById("cwr");
  relou.classList.add("is-hidden");

  showAllCoworkers();

  cutsceneData.currentLine++;
}

// Scène où le collègue relou quitte la fête
function relouLeave() {
  let relou = document.getElementById("cwr");

  if (relou) relou.style.transform = "scaleX(-1)";
  finalSceneRelouLeave();
}

// Début de la cinématique pour le pot de départ du relou
function lastWorkDay() {
  let relou = document.getElementById("cwr");
  if (relou) relou.classList.remove("is-hidden");
  relou.classList.add("final-scene");
  // relou.src = "cwr_carton_pose1.png";

  let coworkerID = 1;
  while (coworkerID < 6) {
    let coworker = document.getElementById(`cw${coworkerID}`);

    if (coworker && coworker.id == "cw1") {
      console.log("Déplacement du collègue 1");
      coworker.style.left = "-100px";
      coworker.style.bottom = "0px";
    }
    if (coworker && coworker.id == "cw2") {
      console.log("Déplacement du collègue 2");
      coworker.style.transform = "scaleX(-1)";
    }
    if (coworker && coworker.id == "cw3") {
      console.log("Déplacement du collègue 3");
      coworker.style.left = "200px";
    }
    if (coworker && coworker.id == "cw4") {
      console.log("Déplacement du collègue 4");
      coworker.style.left = "270px";
      coworker.style.transform = "scaleX(-1)";
    }
    if (coworker && coworker.id == "cw5") {
      console.log("Déplacement du collègue 5");
      coworker.style.left = "290px";
      coworker.style.transform = "scaleX(-1)";
      coworker.style.bottom = "-50px";
    }

    coworkerID++;
  }

  let boss = document.getElementById("boss");
  if (boss) boss.remove();
}
// #endregion

// Scènes où le patron est absent et les collègues discutent entre eux
// ---- Masque le patron et le relou pendant que les collègues papotent et les font réapparaître un peu plus tard
function noBoss(line) {
  let boss = document.getElementById("boss");
  let relou = document.getElementById("cwr");

  // Dicussion des collègues
  if (line == "") {
    if (boss) boss.classList.add("is-hidden");
    if (relou) relou.classList.add("is-hidden");

    let coworker3 = document.getElementById(`cw3`);
    if (coworker3) coworker3.style.transform = "scaleX(-1)";
    let coworker5 = document.getElementById(`cw5`);
    if (coworker5) coworker5.style.transform = "scaleX(-1)";

    cutsceneData.textList[cutsceneData.currentLine] = "... ...";
  }

  if (line === "__STOP__") {
    let coworker3 = document.getElementById(`cw3`);
    if (coworker3) coworker3.style.transform = "";
    let coworker5 = document.getElementById(`cw5`);
    if (coworker5) coworker5.style.transform = "";
    cutsceneData.currentLine++;
  }

  // Retour du patron
  if (line === "__BOSSBACK__") {
    if (boss) boss.classList.remove("is-hidden");
    if (relou) relou.classList.remove("is-hidden");

    cutsceneData.currentLine++;
  }
}
