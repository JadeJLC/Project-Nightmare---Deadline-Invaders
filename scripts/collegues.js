// Fonction pour récupérer l'image du collègue relou
export function createRelou(relouName) {
  const initial = relouName[0].toUpperCase();
  return /[A-Z]/.test(initial)
    ? `../images/initials/${initial}.png`
    : `../images/initials/0.png`;
}
