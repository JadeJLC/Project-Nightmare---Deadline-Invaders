import { gameData, levelData, playerIcon } from "../variables.js";
import { teamBuild } from "../powerups/powerups-effects.js";
import { Coworker, Relou } from "../enemies/coworker-class.js";

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
    if (difference >= levelData.coworkerBonus) {
      gameData.goodScore += levelData.coworkerBonus;
    } else {
      gameData.goodScore += difference;
    }
    console.log("Collègue éliminé, score:", gameData.goodScore);
  } else if (enemy instanceof Relou) {
    enemy.hit();
    if (difference >= levelData.relouMalus) {
      gameData.badScore += levelData.relouMalus;
    } else {
      gameData.badScore += difference;
    }

    gameData.badScore += levelData.relouMalus;
    console.log("Relou touché, compteur:", gameData.badScore);
  }
}

function playerDamage() {
  if (playerIcon.classList.contains("player--hit")) return;

  if (gameData.goodScore === 0) {
    gameData.badScore += levelData.relouMalus;
  } else if (gameData.goodScore >= levelData.coworkerBonus) {
    gameData.goodScore -= levelData.coworkerBonus;
  } else if (gameData.goodScore < levelData.coworkerBonus) {
    gameData.goodScore -= gameData.goodScore;
  }
  console.log("Le joueur est touché ! Score valide :" + gameData.goodScore);

  playerIcon.classList.add("player--hit");
  setTimeout(() => playerIcon.classList.remove("player--hit"), 400);
}

export { rectsIntersect, enemyDamage, playerDamage };
