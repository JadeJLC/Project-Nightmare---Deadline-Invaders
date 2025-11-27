const playerName = prompt("Entrez votre nom");
const relouName = prompt("Entrez le nom de votre collègue relou");
let relouImage;

// Fonction pour récupérer l'image du collègue relou
function createRelou() {
  const initial = relouName[0].toUpperCase();
  relouImage = /[A-Z]/.test(initial)
    ? `../images/initials/${initial}.png`
    : `../images/initials/0.png`;
}

export { playerName, relouName, relouImage };
