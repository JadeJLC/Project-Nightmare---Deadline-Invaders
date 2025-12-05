function createRelou(relouName) {
  const initial = relouName[0].toUpperCase();
  return /[A-Z]/.test(initial)
    ? `../images/initials/${initial}.png`
    : `../images/initials/0.png`;
}

// Fonction pour générer les images des autres collègues (choisit au hasard entre 5 images à afficher)
function createCoworkers() {
  let i = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  if (i > 5) i = 5;

  return `../images/coworker${i}.png`;
}

export { createRelou, createCoworkers };
