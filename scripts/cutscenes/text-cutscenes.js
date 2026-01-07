import { gameData, gameOptions, lastLevel } from "../variables.js";
import { advanceCutScene } from "./write-cutscenes.js";

function cutsceneIntro() {
  let bossName = ["(Patron)", "Le patron", "au patron", "", "il"];
  if (gameOptions.map === 1)
    bossName = ["(Patronne)", "La Patronne", "à la patronne", "e", "elle"];

  const introTxt = [
    `${bossName[0]} : Oh, ${gameData.playerName} ! Tu tombes bien. Laisse-moi te présenter le nouveau membre de votre équipe !`,
    `__PROMPT__`,
  ];

  advanceCutScene(introTxt);
}

function cutsceneFailedLevel() {
  const failedTxt = [
    ``,
    `(Collègue) : Je ne comprends rien de ce que ${gameData.relouName} a fait.`,
    `(Collègue) : Il n'y a rien à comprendre ! Tout le projet est fichu en l'air.`,
    `__RELOUSEUL__`,
    `__STOP__`,
    `(Collègue) : Ah, ${gameData.relouName}, à propos du problème dont on a parlé...`,
    `(${gameData.relouName}) : La deadline c'était hier. J'ai assez donnné, si vous voulez vous y mettre, faites-le.`,
    `(Collègue) : ...`,
    `(${gameData.playerName}) : Tu dis ça comme si on n'avait rien fait.`,
    `(Collègue) : ${bossName[1]} arrive.`,
    `__STOP__`,
    `__BOSSBACK__`,
    `${boss[0]} : Je ne comprends pas. Vous êtes supposés être compétents !`,
    `(${gameData.relouName}) : J'ai essayé de leur expliquer comment faire, mais ils n'ont pas voulu m'écouter.`,
    `(Autres collègues) : Tu n'as pas...`,
    `${boss[0]} : Je me fiche de vos justifications. Le client nous a donné une seconde chance. Ne la gâchez pas.`,
  ];

  advanceCutScene(failedTxt);
}

function cutsceneGameOver() {
  const badEndingTxt = [
    ``,
    `__BOSSBACK__`,
    `(Patron ) : ... Vous me décevez énormément. Le client est furieux, nous n'avons rien de propre à lui rendre.`,
    `(Collègue) : C'est ${gameData.relouName} qui...`,
    `${boss[0]} : Je ne veux pas de vos excuses. Toute l'équipe s'est montrée inefficace.`,
    `(Collègues) : ...`,
    `${boss[0]} : Je vais devoir reformer une nouvelle équipe. Sans vous.`,
    `(Collègues) : Vous ne pouvez pas faire ça !`,
    `${boss[0]} : Bien sûr que si. Je ne peux visiblement pas compter sur vous.`,
    `${boss[0]} :  Ne vous en faites pas. Je vous trouverais d'autres tâches. Plus à votre niveau.`,
    `(${gameData.playerName}) : ... `,
    `__CUT__`,
    `(Collègue) : Je n'arrive pas à y croire...`,
    `(Collègue) : Tout ça, c'est de la faute de ${gameData.relouName}...`,
    `(Collègue) : Au moins, on n'a pas été renvoyés...`,
    `(Collègue) : Pour l'instant...`,
    `(Collègue) : Désolé, ${gameData.playerName}... On n'a pas été à la hauteur...`,
    `(${gameData.playerName}) : Ce n'est pas votre faute. Tout finira par s'arranger.`,
    `(${gameData.playerName}) : *chuchote* Enfin, j'espère...`,
  ];

  advanceCutScene(badEndingTxt);
}

function cutsceneEndFirstLevel() {
  let very = "";
  if (lastLevel.score === 100) {
    very = "très";
  }

  const firstLvlTxt = [
    ``,
    `(Collègue) : ${gameData.relouName} a modifié la moitié de mon travail.`,
    `(Collègue) : J'ai dû repasser derrière sur tout...`,
    `(Collègue) : Heureusement que tu étais là, ${gameData.playerName}.`,
    `(Collègue) : Il faut vraiment qu'on en parle à...`,
    `(Collègue) : ${bossName[1]} arrive !`,
    `__STOP__`,
    `__BOSSBACK__`,
    `__BOSSTURN__`,
    `${boss[0]} : Bravo à tous. Le client est ${very} satisfait de nos résultats.`,
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
    `${boss[0]} : Nous avons reçu une nouvelle commande. ${gameData.relouName} sera votre chef de projet.`,
    `(${gameData.playerName}) : !!!`,
  ];

  advanceCutScene(firstLvlTxt);
}

function cutsceneEndSecondLevel() {
  const secondLvlTxt = [
    ``,
    `(Collègue) : J'en ai marre ! Il faut vraiment qu'on en parle ${bossName[2]} !`,
    `(Collègue) : ${gameData.relouName} va encore s'attribuer le mérite de notre travail...`,
    `(Collègue) : Chut. Ils sont là.`,
    `__STOP__`,
    `(Collègue) : *chuchote* Qui lui en parle ?`,
    `__BOSSBACK__`,
    `__BOSSTURN__`,
    `${boss[0]} : Je suis très fier de toi, ${gameData.relouName}. Tu as fait un travail fantastique comme chef de projet.`,
    `__BOSSTURN__`,
    `(${gameData.playerName}) : En fait...`,
    `(${gameData.relouName}) : Oh, vous savez, ce n'était pas grand-chose. Je n'ai fait que donner toutes les directives et abattre la moitié du travail.`,
    `(Autres collègues) : ...`,
    ` ${boss[0]} : Ne sois pas si modeste.`,
    `__WAIT__`,
    `__MANAGEMENT__`,
    `__MANAGEMENT__ ${boss[0]} : Je pense que ${gameData.relouName} a vraiment fait un travail fantastique, chaque jour depuis son arrivée.`,
    `__MANAGEMENT__ ${boss[0]} : Je propose donc une promotion au rang de manager. ${gameData.relouName} peut gérer facilement de plus grosses équipes.`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `__BOSSTURN__`,
    `${boss[0]} : Je compte sur toi pour ce projet, ${gameData.relouName}. Je suis sûr${bossName[3]} que tu t'en sortiras très bien, comme pour les autres.`,
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
    `(Collègue) : Il est vraiment temps qu'on en parle ${bossName[2]}.`,
    `(Collègue) : Cette fois, il ne faut pas qu'on se laisse interrompre !`,
    `(Collègue) : ${gameData.playerName}, sans toi, on n'aurait pas réussi à finir le projet.`,
    `(Collègue) : On ne laissera pas ${gameData.relouName} s'attribuer encore le mérite de ton travail !`,
    `__STOP__`,
    `__BOSSBACK__`,
    `${boss[0]} : Je suis très content de voir que le management de ${gameData.relouName} a été efficace.`,
    `(${gameData.relouName}) : Je ne pouvais pas vous décevoir après cette preuve de confiance.`,
    `(Collègue) : Chef, je peux vous parler ?`,
    `(${gameData.relouName}) : Oui ?`,
    `(Collègue) : Pas toi. S'il vous plaît.`,
    `${boss[0]} : ... Venez avec moi`,
    `__DENONCE__`,
    `*discute*`,
    `*discute*`,
    `*discute*`,
    `(Collègue) : On n'arrivait pas à vous en parler.`,
    `${boss[0]} : ... Je vois...`,
    `__WAIT__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__SECRETTALK__`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `__NORELOU__`,
    `${boss[0]} : Je suis désolé${bossName[3]} d'apprendre ce qui s'est passé ces derniers jours.`,
    `${boss[0]} : J'ai entendu vos plaintes et revu votre travail en détails.`,
    `${boss[0]} : ${gameData.relouName} m'a induit${boss[3]} en erreur. Je vous présente mes excuses. Vous auriez dû pouvoir me parler librement.`,
    `${boss[0]} : J'espère que l'environnement de travail sera plus agréable à compter d'aujourd'hui.`,
  ];

  let perfectEndingTxt = [];

  if (gameData.score === 300) {
    perfectEndingTxt = [
      `${boss[0]} : ${gameData.playerName} J'aimerais te parler en privé`,
      `__PRIVATE__`,
      `${boss[0]} : Tes collègues m'ont fait comprendre que tu avais fait un travail exceptionnel.`,
      `${boss[0]} : Ils n'ont pas tari d'éloges à ton sujet.`,
      `${boss[0]} : Que dirais-tu de prendre la place de ${gameData.relouName} ? Tu la mérites.`,
      `(${gameData.playerName}) : !!`,
    ];

    perfectEndingTxt.forEach((line) => thirdLvlTxt.push(line));
  }

  const endGameParty = [
    `__ENDGAME__`,
    `(Collègue) : Je n'arrive pas à croire qu'${bossName[4]} nous a écoutés !`,
    `(Collègue) : On va enfin pouvoir travailler librement.`,
    `(${gameData.relouName}) : ...`,
    `(${gameData.relouName}) : Tout est de ta faute, ${gameData.playerName}.`,
    `(${gameData.playerName}) : Si tu n'avais pas voulu t'attribuer le mérite de notre travail, tu n'en serais pas là.`,
    `(${gameData.relouName}) : Ce n'est pas terminé.`,
    `__RELOULEAVE__`,
    `(Collègue) : ${gameData.relouName} avait vraiment l'air en colère.`,
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
  cutsceneGameOver,
};
