import { menu, confirmZone, confirmBtn } from "../variables.js";
import { resetGame, restartLevel } from "./reset.js";

function confirmRestart() {
  menu.querySelector("div").classList.add("is-hidden");
  document.getElementById("alert").textContent =
    "Recommencer le niveau ? Toute votre progression sur ce niveau sera perdue.";

  confirmZone.classList.remove("is-hidden");
  confirmBtn.addEventListener("click", restartLevel);
}

function confirmReset() {
  menu.querySelector("div").classList.add("is-hidden");
  document.getElementById("alert").textContent =
    "Attention ! Toute progression sera perdue si vous revenez au menu principal.";

  confirmZone.classList.remove("is-hidden");
  confirmBtn.addEventListener("click", resetGame);
}

function cancelConfirm() {
  menu.querySelector("div").classList.remove("is-hidden");
  confirmZone.classList.add("is-hidden");
  confirmBtn.removeEventListener("click", resetGame);
  confirmBtn.removeEventListener("click", restartLevel);
}

export { confirmReset, confirmRestart, cancelConfirm };
