import { gameData } from "../variables.js";
import { textList, nextLine } from "./write-cutscenes.js";

function skipCutscene() {
  if (textList[1] === `__PROMPT__` && gameData.relouName == "0") {
    gameData.relouName = prompt("Entrez le nom de votre collègue relou :");
    while (
      gameData.relouName === "" ||
      gameData.relouName === gameData.playerName
    ) {
      gameData.relouName = prompt(
        "Votre collègue ne peut avoir un nom vide ou identique au vôtre. Entrez le nom de votre collègue relou :"
      );
    }
  }

  nextLine(true);
}

function fastSkip(e) {
  console.log("Touche pressée:", e.key, e.code);
  if (e.key === "Shift") {
    e.preventDefault();
    if (confirm("Passer la cinématique ?")) {
      skipCutscene();
    }
  }
}
export { skipCutscene, fastSkip };
