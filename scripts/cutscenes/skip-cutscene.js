import { namePopup } from "../engine/popups.js";
import { cutsceneData, nextLine } from "./write-cutscenes.js";
import { gameData } from "../variables.js";
import { confirmSkip } from "../engine/popups.js";

function skipCutscene() {
  if (cutsceneData.textList[1] === `__PROMPT__` && gameData.relouName == "0") {
    namePopup("SkipCutscene", "Relou");
  } else {
    nextLine(true);
  }
}

function fastSkip(e) {
  if (e.key === "Shift") {
    e.preventDefault();
    confirmSkip();
  }
}

export { skipCutscene, fastSkip };
