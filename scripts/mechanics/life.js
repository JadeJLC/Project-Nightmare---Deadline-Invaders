import { gameData, endLvl, toCutscene, enemyLines } from "../variables.js";
import { badEnding } from "../cutscenes/select-cutscene.js";
import { selectCutscene } from "../cutscenes/select-cutscene.js";
import { scoreScreen } from "../engine/levels.js";
import { pauseGame } from "../menus/pause.js";

function initLives() {
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < gameData.lives; i++) {
    const heart = document.createElement("div");
    heart.classList.add("mini-tile");
    heart.style.backgroundPosition = "-144px -288px";
    heart.alt = "Vie";
    livesContainer.appendChild(heart);
  }
}

function loseLife() {
  if (gameData.lives > 0) {
    gameData.lives--;
    initLives();
    console.log(`❤️ Vie perdue ! Vies restantes: ${gameData.lives}`);
  }

  // Game Over uniquement si plus de vies
  if (gameData.lives === 0) {
    if (gameData.gameMode === "Story") {
      badEnding();
    } else if (gameData.gameMode === "Endless") {
      endlessGameOver();
    }
  }
}

function endlessGameOver() {
  pauseGame();
  enemyLines.innerHTML = "";
  gameData.currentMusic = "main-menu";
  console.log("💀 Game Over en mode Sans Fin");
  endLvl.classList.remove("is-hidden");
  endLvl.firstElementChild.innerHTML = `Game Over. Vous êtes à court de vies. <br/><br/>
    Votre score final est de ${gameData.goodScore}<br/><br/>
    Rejouez pour améliorer votre score !`;

  gameData.levelscores[0] = gameData.goodScore;

  toCutscene.removeEventListener("click", selectCutscene);
  toCutscene.addEventListener("click", scoreScreen);
  toCutscene.textContent = "Continuer";
  toCutscene.focus();
}

export { initLives, loseLife };
