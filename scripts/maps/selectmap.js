import { mainMenuContainer } from "../variables.js";

let mapID = 0;
let popup;
const root = document.documentElement;
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

function selectMapPopup() {
  let coworkerID = 0;
  root.style.setProperty("--map", `url("/images/map0${mapID}-tileset.png"`);

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

  const confirm = document.createElement("button");
  confirm.type = "button";
  confirm.textContent = "Confirmer";
  confirm.id = "confirm-btn";

  confirm.addEventListener("click", function () {
    document.removeEventListener("keydown", changeMap);
    popup.remove();
  });

  while (coworkerID < 8) {
    let current = coworkerTiles[coworkerID];
    let newCoworker = document.createElement("div");
    // newCoworker.textContent = coworkerID;

    let sourceX = current[0] * tilesize * 2;
    let sourceY = current[1] * tilesize * 2;

    newCoworker.id = current[2];
    newCoworker.classList.add("medium-tile");
    newCoworker.style.backgroundPosition = `-${sourceX}px -${sourceY}px`;
    popup.appendChild(newCoworker);
    coworkerID++;
  }

  popup.appendChild(next);
  popup.appendChild(previous);
  popup.appendChild(confirm);

  mainMenuContainer.appendChild(popup);
}

function nextMap() {
  mapID++;
  if (mapID > 3) mapID = 0;
  selectMapPopup();
  const next = document.getElementById("next-btn");
  next.classList.add("acted");

  setTimeout(() => {
    next.classList.remove("acted");

    const confirm = document.getElementById("confirm-btn");
    confirm.focus();
  }, 200);
}

function previousMap() {
  mapID--;
  if (mapID < 0) mapID = 3;
  selectMapPopup();
  const previous = document.getElementById("previous-btn");
  previous.classList.add("acted");

  setTimeout(() => {
    previous.classList.remove("acted");

    const confirm = document.getElementById("confirm-btn");
    confirm.focus();
  }, 200);
}

function changeMap(e) {
  if (e.key === "ArrowLeft") previousMap();
  if (e.key === "ArrowRight") nextMap();
}

export { selectMapPopup };
