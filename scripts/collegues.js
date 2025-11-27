// Fonction pour récupérer l'image du collègue relou
function createRelou(relouName) {
  const initial = relouName[0].toUpperCase();
  return /[A-Z]/.test(initial)
    ? `../images/initials/${initial}.svg`
    : `../images/initials/0.svg`;
}

// Fonction pour générer les images des autres collègues (choisit au hasard entre 5 images à afficher)
function createCoworkers() {
  let i = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  if (i > 5) i = 5;

  return `../images/coworker.svg`; // Ligne temporaire pour le test à remplacer par la ligne d'après une fois les images implémentées
  // return `../images/coworker0${i}.svg`;
}

export { createRelou };
