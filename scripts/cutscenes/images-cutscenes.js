import { sceneZone, cutsceneAnimation } from "../variables.js";
import { cutsceneMaps } from "./images-map.js";

let animationFrameId;

let currentPose = 1;
const lastPose = 4;
const duration = 180;
let lastFrameTime = 0;

function cutsceneDeleteCoworkers() {
  cutsceneAnimation.innerHTML = "";
  stopCutsceneAnimation();
}

function cutsceneDisplayCoworkers() {
  cutsceneAnimation.innerHTML = "";
  let coworkerID = 1;
  let poseKey = "pose" + currentPose;

  while (coworkerID < 6) {
    let newCoworker = document.createElement("div");

    newCoworker.classList.add("big-tile");
    let cwKey = "coworker" + coworkerID;
    let cwMap = cutsceneMaps[cwKey];

    newCoworker.style.backgroundPosition = cwMap[poseKey];
    newCoworker.id = `cw${coworkerID}`;
    cutsceneAnimation.appendChild(newCoworker);
    coworkerID++;
  }

  let relou = document.createElement("div");
  relou.classList.add("big-tile");
  relou.style.backgroundPosition = cutsceneMaps.relou[poseKey];
  relou.id = "cwr";
  cutsceneAnimation.appendChild(relou);

  let boss = document.createElement("div");
  boss.classList.add("big-tile");
  boss.style.backgroundPosition = cutsceneMaps.boss[poseKey];
  boss.id = "boss";
  cutsceneAnimation.appendChild(boss);

  animationFrameId = requestAnimationFrame(animateCoworkers);
}

function animateCoworkers(timestamp) {
  if (timestamp - lastFrameTime >= duration) {
    lastFrameTime = timestamp;

    cutsceneMoveCoworkers();
  }

  animationFrameId = requestAnimationFrame(animateCoworkers);
}

function cutsceneMoveCoworkers() {
  currentPose = (currentPose % lastPose) + 1;

  const normalPose = "pose" + currentPose;
  const partyPose = "party_pose" + currentPose;

  let coworkerID = 1;
  while (coworkerID < 6) {
    let coworker = document.getElementById(`cw${coworkerID}`);
    let cwKey = "coworker" + coworkerID;
    let cwMap = cutsceneMaps[cwKey];

    if (coworker) {
      if (coworker.classList.contains("final-scene")) {
        coworker.style.backgroundPosition = cwMap[partyPose];
      } else {
        coworker.style.backgroundPosition = cwMap[normalPose];
      }
    }

    coworkerID++;
  }

  let party = document.getElementById("party-lights");
  if (party) party.style.backgroundPosition = cutsceneMaps.party[normalPose];

  let relou = document.getElementById("cwr");
  if (relou) {
    if (relou.classList.contains("final-scene")) {
      relou.style.backgroundPosition = cutsceneMaps.relou[partyPose];
    } else {
      relou.style.backgroundPosition = cutsceneMaps.relou[normalPose];
    }
  }

  let boss = document.getElementById("boss");
  if (boss) boss.style.backgroundPosition = cutsceneMaps.boss[normalPose];
}

function stopCutsceneAnimation() {
  cancelAnimationFrame(animationFrameId);
}

export { cutsceneDisplayCoworkers, cutsceneDeleteCoworkers };
