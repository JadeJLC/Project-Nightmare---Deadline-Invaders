import { createRelou } from "./collegues.js";

const playerName = prompt("Entrez votre nom");
const relouName = prompt("Entrez le nom de votre collègue relou");
let relouImage = createRelou(relouName);

export { playerName, relouName, relouImage, currentEvent };
