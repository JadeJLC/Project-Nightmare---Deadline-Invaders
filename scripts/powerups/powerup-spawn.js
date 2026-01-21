import { gameData } from "../variables.js";

// #region ***** Données des powerup
let powerUpData = {
  type: "",
  name: "",
};

let powerUpList = [
  {
    type: "diplomat",
    name: "Diplomate",
    tutorial: false,
    key: "V",
    effect:
      "Le collègue diplomate vous permet d'arrêter les mouvements ennemis.",
  },
  {
    type: "boss",
    name: "Patron",
    tutorial: false,
    key: "X",
    effect: `Le patron retire un ${gameData.relouName} de l'écran de jeu.`,
  },
  {
    type: "team",
    name: "Team Building",
    tutorial: false,
    key: "B",
    effect: `Grâce au team building, tirer sur ${gameData.relouName} augmente le score positif.`,
  },
  {
    type: "boost",
    name: "Boost",
    tutorial: false,
    key: "N",
    effect:
      "Le boost de productivité multiplie par deux le pourcentage positif conféré par les collègues.",
  },
  {
    type: "backup",
    name: "Backup",
    tutorial: false,
    key: ", | ?",
    effect:
      "Un backup du projet vous permet de retirer le dernier pourcentage négatif ajouté à votre score.",
  },
  {
    type: "coffee",
    name: "Café",
    tutorial: false,
    key: "C",
    effect: "Le café augmente votre vitesse de mouvement.",
  },
  {
    type: "perfect",
    name: "Perfectionnisme",
    tutorial: false,
    key: "W",
    effect: "Le perfectionnisme arrête les tirs ennemis.",
  },
];
// #endregion

// #region ***** Apparition des power-ups sur l'écran
let floatingPowerUp = false;

function randomizePowerUps() {
  // En mode sans fin, des vies peuvent défiler sur la ligne des power-ups
  const lifeProba = 0.15;
  if (
    gameData.gameMode === "Endless" &&
    gameData.lives < 3 &&
    Math.random() < lifeProba
  ) {
    powerUpData.type = "life";
    powerUpData.name = "Life";
    return;
  }

  const randomIndex = Math.floor(Math.random() * powerUpList.length);
  const selected = powerUpList[randomIndex];

  powerUpData.type = selected.type;
  powerUpData.name = selected.name;
}

function spawnPowerUp(cfg, levelData) {
  if (floatingPowerUp) return;

  randomizePowerUps();

  const spawnY = 60 + levelData.lineCount * cfg.lineSpacingY;
  const direction = levelData.lineCount % 2 === 0 ? "right" : "left";
  const startX = direction === "right" ? -50 : cfg.screenWidth + 50;

  new PowerUp(startX, spawnY, direction);
  floatingPowerUp = true;
}
// #endregion

export { spawnPowerUp, powerUpList, powerUpData };
