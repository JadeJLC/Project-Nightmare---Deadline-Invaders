import { sceneZone, cutsceneAnimation } from "../variables.js";

let animationFrameId;

let currentPose = 1;
const lastPost = 4;
const duration = 180;
let lastFrameTime = 0;

function cutsceneDeleteCoworkers() {
  cutsceneAnimation.innerHTML = "";
  stopCutsceneAnimation();
}

function cutsceneDisplayCoworkers() {
  cutsceneAnimation.innerHTML = "";
  let coworkerID = 1;

  while (coworkerID < 6) {
    let newCoworker = document.createElement("img");
    newCoworker.src = `/images/cutscenes/cw${coworkerID}_pose${currentPose}.png`;
    newCoworker.id = `cw${coworkerID}`;
    cutsceneAnimation.appendChild(newCoworker);
    coworkerID++;
  }

  let relou = document.createElement("img");
  relou.src = `/images/cutscenes/cwr_pose${currentPose}.png`;
  relou.id = "cwr";
  cutsceneAnimation.appendChild(relou);

  let boss = document.createElement("img");
  boss.src = `/images/cutscenes/boss_pose${currentPose}.png`;
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
  currentPose = (currentPose % lastPost) + 1;

  let coworkerID = 1;
  while (coworkerID < 6) {
    let coworker = document.getElementById(`cw${coworkerID}`);

    if (coworker)
      coworker.src = `/images/cutscenes/cw${coworkerID}_pose${currentPose}.png`;

    coworkerID++;
  }

  let relou = document.getElementById("cwr");
  if (relou) {
    if (relou.classList.contains("final-scene")) {
      relou.src = `/images/cutscenes/cwr_carton_pose${currentPose}.png`;
    } else {
      relou.src = `/images/cutscenes/cwr_pose${currentPose}.png`;
    }
  }

  let boss = document.getElementById("boss");
  if (boss) boss.src = `/images/cutscenes/boss_pose${currentPose}.png`;
}

function stopCutsceneAnimation() {
  cancelAnimationFrame(animationFrameId);
  console.log("Animation stopped.");
}

export { cutsceneDisplayCoworkers, cutsceneDeleteCoworkers };
