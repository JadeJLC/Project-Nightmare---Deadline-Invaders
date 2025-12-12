import { gameData, lastLevel } from "../variables.js";
import { advanceCutScene } from "./write-cutscenes.js";

function cutsceneIntro() {
  const introTxt = [
    `(Patron) : Oh, ${gameData.playerName} ! Tu tombes bien. Laisse-moi te présenter le nouveau membre de votre équipe !`,
    `__PROMPT__`,
  ];

  advanceCutScene(introTxt);
}

function cutsceneFailedLevel() {
  const failedTxt = [
    ``,
    `(Collègue) : Je ne comprends rien de ce que ${gameData.relouName} a fait.`,
    `(Collègue) : Il n'y a rien à comprendre ! Tout le projet est fichu en l'air.`,
    `(Collègue) : Le patron va être furieux...`,
    `(Collègue) : Le voilà.`,
    `__STOP__`,
    `__BOSSBACK__`,
    `(Patron) : Je ne comprends pas. Vous êtes supposés être compétents !`,
    `(${gameData.relouName}) : J'ai essayé de leur expliquer comment faire, mais ils n'ont pas voulu m'écouter.`,
    `(Autres collègues) : Tu n'as pas...`,
    `(Patron) : Je me fiche de vos justifications. Le client nous a donné une seconde chance. Ne la gâchez pas.`,
  ];

  advanceCutScene(failedTxt);
}

function cutsceneEndFirstLevel() {
  const firstLvlTxt = [
    ``,
    `(Collègue) : ${gameData.relouName} a modifié la moitié de mon travail.`,
    `(Collègue) : J'ai dû repasser derrière sur tout...`,
    `(Collègue) : Heureusement que tu étais là, ${gameData.playerName}.`,
    `(Collègue) : Il faut vraiment qu'on en parle au...`,
    `(Collègue) : Le patron arrive !`,
    `__STOP__`,
    `__BOSSBACK__`,
    `__BOSSTURN__`,
    `(Patron) : Bravo à tous. Le client est satisfait de nos résultats.`,
    `(${gameData.playerName}) : Mer...`,
    `(${gameData.relouName}) : Merci. Ce n'était pas toujours facile de coordonner l'équipe mais j'ai bien réussi.`,
    `(${gameData.playerName}) : ...`,
    `(Autres collègues) : ...`,
    `(${gameData.relouName}) : *chuchote* Honnêtement, j'ai fait le plus gros du boulot. Sans moi, on n'aurait pas pu rentrer dans les délais.`,
    `__WAIT__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `(Patron) : Nous avons reçu une nouvelle commande. ${gameData.relouName} sera votre chef de projet.`,
    `(${gameData.playerName}) : !!!`,
  ];

  if (lastLevel.score === 100) {
    firstLvlTxt[0] = `(Patron) : Bravo à tous. Le client est très satisfait de nos résultats.`;
  }

  advanceCutScene(firstLvlTxt);
}

function cutsceneEndSecondLevel() {
  const secondLvlTxt = [
    ``,
    `(Collègue) : J'en ai marre ! Il faut vraiment qu'on en parle au patron !`,
    `(Collègue) : ${gameData.relouName} va encore s'attribuer le mérite de notre travail...`,
    `(Collègue) : Chut. Ils sont là.`,
    `__STOP__`,
    `(Collègue) : *chuchote* Qui lui en parle ?`,
    `__BOSSBACK__`,
    `__BOSSTURN__`,
    `(Patron) : Je suis très fier de toi, ${gameData.relouName}. Tu as fait un travail fantastique comme chef de projet.`,
    `__BOSSTURN__`,
    `(${gameData.playerName}) : En fait...`,
    `(${gameData.relouName}) : Oh, vous savez, ce n'était pas grand-chose. Je n'ai fait que donner toutes les directives et abattre la moitié du travail.`,
    `(Autres collègues) : ...`,
    ` (Patron) : Ne sois pas si modeste.`,
    `__WAIT__`,
    `__MANAGEMENT__`,
    `__MANAGEMENT__ (Patron) : Je pense que ${gameData.relouName} a vraiment fait un travail fantastique, chaque jour depuis son arrivée.`,
    `__MANAGEMENT__ (Patron) : Je propose donc de le promouvoir au rang de manager. Il peut gérer facilement de plus grosses équipes.`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `__BOSSTURN__`,
    `(Patron) : Je compte sur toi pour ce projet, ${gameData.relouName}. Je suis sûr que tu t'en sortiras très bien, comme pour les autres.`,
    `__BOSSTURN__`,
    `(${gameData.relouName}) : Évidemment.`,
    `(Autres collègues) : ...`,
  ];

  advanceCutScene(secondLvlTxt);
}

function cutsceneEndThirdLevel() {
  console.log("Fin du jeu.");
  let thirdLvlTxt = [
    ``,
    `(Collègue) : Il est vraiment temps qu'on en parle au patron.`,
    `(Collègue) : Cette fois, il ne faut pas qu'on se laisse interrompre !`,
    `(Collègue) : ${gameData.playerName}, sans toi, on n'aurait pas réussi à finir le projet.`,
    `(Collègue) : On ne laissera pas ${gameData.relouName} s'attribuer encore le mérite de ton travail !`,
    `__STOP__`,
    `__BOSSBACK__`,
    `(Patron) : Je suis très content de voir que le management de ${gameData.relouName} a été très efficace.`,
    `(${gameData.relouName}) : Je ne pouvais pas vous décevoir après cette preuve de confiance.`,
    `(Collègue) : Chef, je peux vous parler ?`,
    `(${gameData.relouName}) : Oui ?`,
    `(Collègue) : Pas toi. S'il vous plaît.`,
    `(Patron) : ... Venez avec moi`,
    `__DENONCE__`,
    `*discute*`,
    `*discute*`,
    `*discute*`,
    `(Collègue) : On n'arrivait pas à vous en parler.`,
    `(Patron) : ... Je vois...`,
    `__WAIT__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `__NORELOU__`,
    `(Patron) : Je suis désolé d'apprendre ce qui s'est passé ces derniers jours.`,
    `(Patron) : J'ai entendu vos plaintes et revu votre travail en détails.`,
    `(Patron) : ${gameData.relouName} s'est joué de moi. Je vous présente mes excuses. Vous auriez dû pouvoir me parler librement.`,
    `(Patron) : J'espère que l'environnement de travail sera plus agréable à compter d'aujourd'hui.`,
  ];

  let perfectEndingTxt = [];

  if (gameData.score === 300) {
    perfectEndingTxt = [
      `(Patron) : ${gameData.playerName} J'aimerais te parler en privé`,
      `__PRIVATE__`,
      `(Patron) : Tes collègues m'ont fait comprendre que tu avais fait un travail exceptionnel.`,
      `(Patron) : Ils n'ont pas tari d'éloges à ton sujet.`,
      `(Patron) : Que dirais-tu de prendre la place de ${gameData.relouName} ? Tu la mérites.`,
      `(${gameData.playerName}) : !!`,
    ];

    perfectEndingTxt.forEach((line) => thirdLvlTxt.push(line));
  }

  const endGameParty = [
    `__ENDGAME__`,
    `(Collègue) : Je n'arrive pas à croire qu'il nous a écoutés !`,
    `(Collègue) : On va enfin pouvoir travailler librement.`,
    `(${gameData.relouName}) : ...`,
    `(${gameData.relouName}) : Tout est de ta faute, ${gameData.playerName}.`,
    `(${gameData.playerName}) : Si tu n'avais pas voulu t'attribuer le mérite de notre travail, tu n'en serais pas là.`,
    `(${gameData.relouName}) : Ce n'est pas terminé.`,
    `__RELOULEAVE__`,
    `(Collègue) : ${gameData.relouName} n'avait vraiment pas l'air content.`,
    `(Collègue) : On s'en fiche. On en est débarrassés ! C'est la fête !`,
  ];

  endGameParty.forEach((line) => thirdLvlTxt.push(line));

  if (gameData.score === 300) {
    perfectEndingTxt = [
      `(Collègue) : Félicitations pour ta promotion, ${gameData.playerName}`,
      `(Collègue) : Tu l'as méritée ! Sans toi, on n'aurait jamais réussi.`,
      `(Collègue) : Vive ${gameData.playerName} !`,
    ];

    perfectEndingTxt.forEach((line) => thirdLvlTxt.push(line));
  }
  thirdLvlTxt.push(`__PARTY__`);

  advanceCutScene(thirdLvlTxt);
}

export {
  cutsceneIntro,
  cutsceneFailedLevel,
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
  cutsceneEndThirdLevel,
};
