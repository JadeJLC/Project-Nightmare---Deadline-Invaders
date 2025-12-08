let positiveScore = 0;
let negativeScore = 0;

export function updateProgressBar() {
  const total = positiveScore + negativeScore;

  // éviter division par zéro
  if (total === 0) {
    document.getElementById("progress-bar").style.width = "0%";
    return;
  }
 
  let percent = (positiveScore / total) * 100;

  percent = Math.max(0, Math.min(100, percent));

  document.getElementById("progress-bar").style.width = percent + "%";
}
