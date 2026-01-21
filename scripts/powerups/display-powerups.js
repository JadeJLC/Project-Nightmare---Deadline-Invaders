import { gameData, gameMessage, powerupsZone } from "../variables.js";

let powerups = {
  Coffee: 0,
  Boss: 0,
  Diplomat: 0,
  Team: 0,
  Boost: 0,
  Perfect: 0,
};

function displayPowerUps() {
  powerupsZone.innerHTML = `Effets bonus<br/> <span class="pup-detail">[i] pour les détails</span><br/>`;
  powerups = {
    Coffee: 0,
    Boss: 0,
    Diplomat: 0,
    Team: 0,
    Boost: 0,
    Perfect: 0,
    Backup: 0,
  };
  gameMessage.textContent = gameData.activePU;

  gameData.powerups.forEach((powerup) => {
    if (powerup === "Café") powerups.Coffee++;
    if (powerup === "Patron") powerups.Boss++;
    if (powerup === "Diplomate") powerups.Diplomat++;
    if (powerup === "Team Building") powerups.Team++;
    if (powerup === "Boost") powerups.Boost++;
    if (powerup === "Perfectionnisme") powerups.Perfect++;
    if (powerup === "Backup") powerups.Backup++;
  });

  if (powerups.Coffee > 0) displayCoffee();
  if (powerups.Boss > 0) displayBoss();
  if (powerups.Diplomat > 0) displayDiplomacy();
  if (powerups.Team > 0) displayTeamBuild();
  if (powerups.Boost > 0) displayProducivityBoost();
  if (powerups.Perfect > 0) displayPerfectionism();
  if (powerups.Backup > 0) displayBackup();

  console.log(powerups);
}

let displayDetails = false;

function powerupDetails() {
  displayDetails = !displayDetails;
  displayPowerUps();
}

// #region ---- Détails des powerups
function displayCoffee() {
  const coffees = document.createElement("div");
  coffees.class = "power-up";
  coffees.alt = coffees.title = "Café<br/> - Boost de vitesse";
  coffees.innerHTML = `<div class="mini-tile coffee"></div> <span>${powerups.Coffee} [C]</span>`;
  if (displayDetails) {
    coffees.innerHTML += `<span class="pup-detail">${coffees.alt}</span>`;
  }

  powerupsZone.appendChild(coffees);
}

function displayBoss() {
  const bossTalks = document.createElement("div");
  bossTalks.class = "power-up";
  bossTalks.alt =
    bossTalks.title = `Parler au patron<br/> - Retire 1 ${gameData.relouName}`;
  bossTalks.innerHTML = `<div class="mini-tile boss"></div> <span>${powerups.Boss} [X]</span>`;

  if (displayDetails) {
    bossTalks.innerHTML += `<span class="pup-detail">${bossTalks.alt}</span>`;
  }

  powerupsZone.appendChild(bossTalks);
}

function displayDiplomacy() {
  const diplomat = document.createElement("div");
  diplomat.class = "power-up";
  diplomat.alt = diplomat.title =
    "Collègue diplomate<br/> - Arrête les mouvements ennemis";
  diplomat.innerHTML = `<div class="mini-tile diplomat"></div> <span>${powerups.Diplomat} [V]</span>`;

  if (displayDetails) {
    diplomat.innerHTML += `<span class="pup-detail">${diplomat.alt}</span>`;
  }

  powerupsZone.appendChild(diplomat);
}

function displayTeamBuild() {
  const team = document.createElement("div");
  team.class = "power-up";
  team.alt =
    team.title = `Team Building<br/> - Tirer sur ${gameData.relouName} compte comme du score positif.`;
  team.innerHTML = `<div class="mini-tile team"></div> <span>${powerups.Team} [B]</span>`;

  if (displayDetails) {
    team.innerHTML += `<span class="pup-detail">${team.alt}</span>`;
  }

  powerupsZone.appendChild(team);
}

function displayProducivityBoost() {
  const boost = document.createElement("div");
  boost.class = "power-up";
  boost.alt = boost.title = "Boost de productivité<br/> - Pourcentage gagné x2";
  boost.innerHTML = `<div class="mini-tile boost"></div> <span>${powerups.Boost} [N]</span>`;

  if (displayDetails) {
    boost.innerHTML += `<span class="pup-detail">${boost.alt}</span>`;
  }

  powerupsZone.appendChild(boost);
}

function displayPerfectionism() {
  const perfect = document.createElement("div");
  perfect.class = "power-up";
  perfect.alt = perfect.title =
    "Perfectionnisme<br/> - Désactive les tirs ennemis";
  perfect.innerHTML = `<div class="mini-tile perfect"></div> <span>${powerups.Perfect} [W]</span>`;

  if (displayDetails) {
    perfect.innerHTML += `<span class="pup-detail">${perfect.alt}</span>`;
  }

  powerupsZone.appendChild(perfect);
}

function displayBackup() {
  const backup = document.createElement("div");
  backup.class = "power-up";
  backup.alt = backup.title = "Backup<br/> - Retire du pourcentage négatif";
  backup.innerHTML = `<div class="mini-tile backup"></div> <span>${powerups.Backup} [W]</span>`;

  if (displayDetails) {
    backup.innerHTML += `<span class="pup-detail">${backup.alt}</span>`;
  }

  powerupsZone.appendChild(backup);
}
// #endregion

export { displayPowerUps, powerupDetails };
