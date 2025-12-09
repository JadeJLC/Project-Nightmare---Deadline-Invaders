import { cutsceneData } from "./write-cutscenes.js";
import { cutsceneAnimation, gameData } from "../variables.js";

export function specialLines() {
  let line = cutsceneData.textList[cutsceneData.currentLine];
  let specialLine = cutsceneData.currentLine;
  let boss = document.getElementById("boss");
  let relou = document.getElementById("cwr");

  console.log(line);

  // Fait avancer le relou quand il parle
  if (line.includes(`(${gameData.relouName})`)) {
    relou.style.left = "335px";
  } else if (relou) {
    relou.style.left = "";
  }

  // Présentation du collègue
  if (line === `__PROMPT__`) {
    boss.style.transform = "scaleX(-1)";
    completeIntroText();
    cutsceneData.currentLine++;
  }

  // Scènes ou le patron se tourne
  if (line === `__BOSSTURN__`) {
    console.log(line);
    if (boss.style.transform === "scaleX(-1)") {
      boss.style.transform = "";
    } else {
      boss.style.transform = "scaleX(-1)";
    }
    cutsceneData.currentLine++;
  }

  // Scènes où le patron n'est pas là
  if ((line == "") | (line === "__STOP__") | (line === "__BOSSBACK__")) {
    noBoss(line);
  }

  // Discussion entre le patron et le relou
  if (line === "__FIRSTSCENE__" || line === "__ENDSCENE__") {
    secretConversation(line);
  }

  // Transition entre les scènes
  if (line === "__WAIT__") {
    cutsceneAnimation.classList.add("is-hidden");
    cutsceneData.textList[cutsceneData.currentLine] = " ... (plus tard) ...";
  } else {
    cutsceneAnimation.classList.remove("is-hidden");
  }

  if (cutsceneData.currentLine != specialLine) specialLines();
}

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
  }

  // Retour du patron
  if (line === "__BOSSBACK__") {
    if (boss) boss.classList.remove("is-hidden");
    if (relou) relou.classList.remove("is-hidden");

    cutsceneData.currentLine++;
  }
}

// Scène de conversation secrète entre le relou et le boss
// ----- Fait disparaître les autres collègues et déplacent le boss et le relou pour qu'ils discutent
function secretConversation(line) {
  let boss = document.getElementById("boss");
  let relou = document.getElementById("cwr");

  // Début de la scène
  if (line === "__FIRSTSCENE__") {
    let coworkerID = 1;
    while (coworkerID < 6) {
      let coworker = document.getElementById(`cw${coworkerID}`);

      if (coworker) coworker.classList.add("is-hidden");

      coworkerID++;
    }

    relou.style.transform = "scaleX(-1)";
    relou.style.left = "50px";
    boss.style.left = "180px";
    boss.style.bottom = "-15px";

    cutsceneData.textList[cutsceneData.currentLine] = `....`;
  }

  // Fin de la scène
  if (line === "__ENDSCENE__") {
    boss.style = "";
    relou.style = "";

    let coworkerID = 1;
    while (coworkerID < 6) {
      let coworker = document.getElementById(`cw${coworkerID}`);

      if (coworker) coworker.classList.remove("is-hidden");

      coworkerID++;
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
