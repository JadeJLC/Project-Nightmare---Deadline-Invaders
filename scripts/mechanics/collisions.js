import { gameData, levelData, playerIcon } from "../variables.js";
import { teamBuild } from "../powerups/powerups-effects.js";
import { Coworker, Relou } from "../enemies/coworker-class.js";
import { loseLife } from "./life.js";

function rectsIntersect(r1, r2) {
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function enemyDamage(enemy, difference) {
  if (enemy instanceof Coworker || teamBuild) {
    enemy.hit();

    // Mode Histoire : système de score valide/invalide
    if (gameData.gameMode === "Story") {
      if (difference >= levelData.coworkerBonus) {
        gameData.goodScore += levelData.coworkerBonus;
      } else {
        gameData.goodScore += difference;
      }
    }
    // Mode Sans fin : score simple
    else if (gameData.gameMode === "Endless") {
      gameData.goodScore += levelData.coworkerBonus;
    }
  } else if (enemy instanceof Relou) {
    enemy.hit();

    // Mode Histoire : score corrompu
    if (gameData.gameMode === "Story") {
      if (difference >= levelData.relouMalus) {
        gameData.badScore += levelData.relouMalus;
      } else {
        gameData.badScore += difference;
      }
    }
    // Mode Sans fin : perte de score
    else if (gameData.gameMode === "Endless") {
      if (gameData.goodScore >= levelData.relouMalus) {
        gameData.goodScore -= levelData.relouMalus;
      } else {
        gameData.goodScore = 0;
      }
    }
  }
}

function playerDamage() {
  if (playerIcon.classList.contains("player--hit")) return;

  // Mode Histoire : perte de score valide
  if (gameData.gameMode === "Story") {
    if (gameData.goodScore === 0) {
      gameData.badScore += levelData.relouMalus;
    } else if (gameData.goodScore >= levelData.coworkerBonus) {
      gameData.goodScore -= levelData.coworkerBonus;
    } else if (gameData.goodScore < levelData.coworkerBonus) {
      gameData.goodScore -= gameData.goodScore;
    }
  }
  // Mode Sans fin : perte de vie
  else if (gameData.gameMode === "Endless") {
    loseLife();
  }

  playerIcon.classList.add("player--hit");
  setTimeout(() => playerIcon.classList.remove("player--hit"), 400);
}

export { rectsIntersect, enemyDamage, playerDamage };
