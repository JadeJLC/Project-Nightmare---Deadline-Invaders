import { mainMenuContainer } from "../variables.js";

let mapID = 0;
const tilesize = 48;
const coworkerTiles = [
  [0, 8, "boss"],
  [0, 12, "relou"],
  [0, 7, "cw1"],
  [0, 9, "cw2"],
  [0, 11, "cw3"],
  [0, 13, "cw4"],
  [0, 15, "cw5"],
  [0, 16, "player"],
];

function selectMap() {
  console.log("Ouverture de la popup de choix de map");
  let coworkerID = 0;

  // Création du formulaire de base
  let popup = document.getElementById("map-popup");

  if (!popup) {
    popup = document.createElement("form");
    popup.id = "map-popup";
  }

  popup.classList.add("confirm-pannel");
  popup.classList.add("popup");
  popup.name = "SwitchMap";
  popup.innerHTML = `<label>Choisissez votre équipe (${mapID}) </label><br/>`;

  console.log("Création du bouton next");
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "➞";
  next.id = "next-btn";
  next.value = "next";

  next.addEventListener("click", nextMap);

  console.log("Création du bouton previous");
  const previous = document.createElement("button");
  previous.type = "button";
  previous.textContent = "🠔";
  previous.id = "previous-btn";
  previous.value = "previous";
  previous.addEventListener("click", previousMap);

  document.addEventListener("keydown", changeMap);

  console.log("Création du collègue");
  while (coworkerID < 8) {
    let current = coworkerTiles[coworkerID];
    let newCoworker = document.createElement("div");
    // newCoworker.textContent = coworkerID;

    let sourceX = current[0] * tilesize * 2;
    let sourceY = current[1] * tilesize * 2;

    newCoworker.id = current[2];
    newCoworker.classList.add("medium-tile");
    newCoworker.classList.add(`map-${mapID}`);
    newCoworker.style.backgroundPosition = `-${sourceX}px -${sourceY}px`;
    popup.appendChild(newCoworker);
    coworkerID++;
  }

  popup.appendChild(next);
  popup.appendChild(previous);

  mainMenuContainer.appendChild(popup);
}

function nextMap() {
  mapID++;
  if (mapID > 3) mapID = 0;
  selectMap();
}

function previousMap() {
  mapID--;
  if (mapID < 0) mapID = 3;
  selectMap();
}

function changeMap(e) {
  if (e.key === "ArrowLeft") previousMap();
  if (e.key === "ArrowRight") nextMap();
}

export { selectMap };
