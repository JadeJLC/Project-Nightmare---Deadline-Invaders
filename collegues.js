const playerName = prompt("Entrez votre nom");
const relouName = prompt("Entrez le nom de votre collègue relou");
let relouImage;

// Fonction pour récupérer l'image du collègue relou
function createRelou() {
  const initial = relouName[0].toUpperCase();
  relouImage = `./images/initials/${initial}.png`;
}

export { playerName, relouName, relouImage };
