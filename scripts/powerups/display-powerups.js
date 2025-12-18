import { gameData, gameMessage, powerupsZone } from "../variables.js";

let powerups = {
  Coffee: 0,
  Boss: 0,
  Diplomat: 0,
  Team: 0,
  Boost: 0,
};

function displayPowerUps() {
  powerupsZone.innerHTML = "";
  powerups = {
    Coffee: 0,
    Boss: 0,
    Diplomat: 0,
    Team: 0,
    Boost: 0,
  };
  gameMessage.textContent = gameData.activePU;

  gameData.powerups.forEach((powerup) => {
    if (powerup === "Café") powerups.Coffee++;
    if (powerup === "Patron") powerups.Boss++;
    if (powerup === "Diplomate") powerups.Diplomat++;
    if (powerup === "Team") powerups.Team++;
    if (powerup === "Boost") powerups.Boost++;
  });

  if (powerups.Coffee > 0) displayCoffee();
  if (powerups.Boss > 0) displayBoss();
  if (powerups.Diplomat > 0) displayDiplomacy();
  if (powerups.Team > 0) displayTeamBuild();
  if (powerups.Boost > 0) displayProducivityBoost();
}

function displayCoffee() {
  const coffees = document.createElement("div");
  coffees.class = "power-up";
  coffees.alt = coffees.title = "Café - Boost de vitesse";
  coffees.innerHTML = `<img src="/images/interface/coffee.svg"/><span>${powerups.Coffee} [C]</span>`;

  powerupsZone.appendChild(coffees);
}

function displayBoss() {
  const bossTalks = document.createElement("div");
  bossTalks.class = "power-up";
  bossTalks.alt =
    bossTalks.title = `Parler au patron - Retire 1 ${gameData.relouName}`;
  bossTalks.innerHTML = `<img src="/images/interface/boss.png"/><span>${powerups.Boss} [X]</span>`;

  powerupsZone.appendChild(bossTalks);
}

function displayDiplomacy() {
  const diplomat = document.createElement("div");
  diplomat.class = "power-up";
  diplomat.alt = diplomat.title =
    "Collègue diplomate - Arrêter les mouvements ennemis";
  diplomat.innerHTML = `<img src="/images/interface/diplomat.png"/><span>${powerups.Diplomat} [V]</span>`;

  powerupsZone.appendChild(diplomat);
}

function displayTeamBuild() {
  const team = document.createElement("div");
  team.class = "power-up";
  team.alt =
    team.title = `Team Building - Tirer sur ${gameData.relouName} compte comme du score positifi.`;
  team.innerHTML = `<img src="/images/interface/team.png"/><span>${powerups.Team} [B]</span>`;

  powerupsZone.appendChild(team);
}

function displayProducivityBoost() {
  const boost = document.createElement("div");
  boost.class = "power-up";
  boost.alt = boost.title = "Boost de productivité - Pourcentage gagné x2";
  boost.innerHTML = `<img src="/images/interface/boost.svg"/><span>${powerups.Boost} [N]</span>`;

  powerupsZone.appendChild(boost);
}

export { displayPowerUps };
