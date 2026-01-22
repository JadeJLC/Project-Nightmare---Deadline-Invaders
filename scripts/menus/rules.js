import { startEndless } from "../engine/endless.js";
import { gameData, mainMenuContainer, menu } from "../variables.js";
import { resumeGame } from "./pause.js";

const rulesContainer = document.getElementById("rules");

function displayRules() {
  if (rulesContainer.innerHTML === "") {
    rulesTitle();
    createRulesHTML();
  } else {
    closeRules();
  }

  menu.classList.add("is-hidden");
}

function rulesTitle() {
  mainMenuContainer.classList.add("is-hidden");
  const title = document.createElement("h1");
  if (gameData.gameMode === "Endless") {
    title.innerHTML = "Règles du mode sans fin";
  } else {
    title.innerHTML = "Règles du jeu";
  }
  title.className = "menu-title";
  rulesContainer.appendChild(title);
}

function createEndlessRules() {
  rulesTitle();
  const rulesBox = document.createElement("div");
  rulesBox.className = "game-rules";
  rulesBox.innerHTML = `Le jeu est inspiré de Space Invaders : vous pouvez vous déplacer sur l'écran avec les flèches gauche et droite du clavier, et tirer avec la touche espace.
<br/><br/>
Travaillez en collaboration avec vos collègues efficaces en évitant le "collègue relou" (portant une casquette). En mode sans fin, des lignes apparaissent 
indéfiniment. Une fois qu'une ligne est vidée de ses collègues efficaces, une nouvelle ligne apparaît en haut de l'écran.
<br/><br/>
Tirer sur un collègue efficace augmentera votre score, tandis que toucher un collègue relou vous fera perdre des points. Attention : vous perdrez une vie si vous 
êtes touchés par les rapports de bugs (tirs rouges) de vos collègues, quels qu'ils soient. Faites bien attention : les collègues efficaces disparaissent quand vous 
leur tirez dessus, mais le "collègue relou" reste. 
<br/><br/>
Pendant le jeu, vous pourrez obtenir des bonus divers qui vous permettront de progresser plus facilement. Ils seront affichés à droite de l'écran. Chaque bonus à sa 
touche associée, indiquée directement à côté. N'hésitez pas à les utiliser !
<br/><br/>
Bonne chance ! 
<br/><br/>`;

  const goBack = document.createElement("button");
  goBack.textContent = "Commencer à jouer";
  goBack.addEventListener("click", startEndless);

  rulesBox.appendChild(goBack);

  rulesContainer.appendChild(rulesBox);
  goBack.focus();
}

function createRulesHTML() {
  const rulesBox = document.createElement("div");
  rulesBox.className = "game-rules";
  rulesBox.innerHTML = `Le jeu est inspiré de Space Invaders : vous pouvez vous déplacer sur l'écran avec les flèches gauche et droite du clavier, et tirer avec la touche espace.
<br/><br/>
Le but de chaque niveau est de compléter un projet en atteignant 100% dans la barre de progression (à gauche). Il vous faut, pour cela, "confier des tâches" à vos collègues - 
c'est-à-dire leur tirer dessus. Attention, cependant : l'un de vos collègues, le "collègue relou" à la casquette rouge, pénalise votre projet. Lui tirer dessus fera 
monter votre barre de progression... en pourcentage invalide. Vous ne pouvez réussir un niveau que si le pourcentage valide (vert) est supérieur au pourcentage invalide 
(rouge). Éviter autant que possible de tirer sur le mauvais collègue !
<br/><br/>
Vos collègues ne sont pas parfaits (personne ne l'est). Ils vous envoient régulièrement des rapports de problèmes ou des bugs, sous la forme de tirs rouges que vous 
devez éviter, sous peine de perdre de la progression - et uniquement votre progression valide. 
<br/><br/>
Échouer à un niveau (donc finir le niveau avec moins de 50% de progression positive) vous fera perdre une vie. Vous avez trois vies avant de déclencher un game over et 
de devoir recommencer le jeu. 
<br/><br/>
Faites bien attention : les collègues efficaces disparaissent quand vous leur tirez dessus, mais le "collègue relou" reste en permanence. Ne vous retrouvez pas dans 
une situation où vous n'avez plus de collègues efficaces et êtes forcés de compléter le pourcentage avec sa participation !
<br/><br/>
Pendant le jeu, vous pourrez obtenir des bonus divers qui vous permettront de progresser plus facilement. Ils seront affichés à droite de l'écran. Chaque bonus à sa 
touche associée, indiquée directement à côté. N'hésitez pas à les utiliser !
<br/><br/>
Bonne chance ! 
<br/><br/>`;

  const goBack = document.createElement("button");
  goBack.textContent = "Retour";
  goBack.addEventListener("click", closeRules);

  rulesBox.appendChild(goBack);

  rulesContainer.appendChild(rulesBox);
}

function closeRules() {
  menu.classList.add("is-hidden");
  mainMenuContainer.classList.remove("is-hidden");
  rulesContainer.innerHTML = "";
  resumeGame();
}

export { displayRules, createEndlessRules, closeRules };
