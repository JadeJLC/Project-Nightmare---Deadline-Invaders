import { gameData } from "./variables.js";

function startGame(mode) {
  gameData.playerName = prompt("Entrez votre nom");

  switch (mode) {
    case "Story":
      storyMode();
      break;
    case "Endless":
      endlessMode();
      break;
  }
}

function storyMode() {
  console.log("Mode Histoire");
  // ---- Lance le mode histoire
}

function endlessMode() {
  console.log("Mode Sans-Fin");
  // ---- Lance le mode sans fin
}

export { startGame };
