import { gameData, lastLevel } from "../variables.js";
import { cutsceneDisplayCoworkers } from "./images-cutscenes.js";
import { advanceCutScene } from "./write-cutscenes.js";

function cutsceneIntro() {
  const introTxt = [
    `(Patron) : Oh, ${gameData.playerName} ! Tu tombes bien. Laisse-moi te présenter le nouveau membre de votre équipe !`,
    `__PROMPT__`,
  ];

  advanceCutScene(introTxt);
  cutsceneDisplayCoworkers();
}

function cutsceneFailedLevel() {
  const failedTxt = [
    ``,
    `(Collègue) : Je ne comprends rien de ce qu'il a fait.`,
    `(Collègue) : Il n'y a rien à comprendre ! Il a gâché tout le projet.`,
    `(Collègue) : Le patron va être furieux...`,
    `(Collègue) : Le voilà.``__STOP__`,
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
    `(Collègue) : Il a modifié la moitié de mon travail.`,
    `(Collègue) : J'ai dû repasser derrière lui sur tout...`,
    `(Collègue) : Heureusement que tu étais là, ${gameData.playerName}.`,
    `(Collègue) : Il faut vraiment qu'on en parle au...`,
    `(Collègue) : Le patron arrive !`,
    `__STOP__`,
    `__BOSSBACK__`,
    `(Patron) : Bravo à tous. Le client est satisfait de nos résultats.`,
    `(${gameData.playerName}) : Mer...`,
    `(${gameData.relouName}) : Merci. Ce n'était pas toujours facile de coordonner l'équipe mais j'ai bien réussi.`,
    `(${gameData.playerName}) : ...`,
    `(Autres collègues) : ...`,
    `(${gameData.relouName}) : *chuchote* Honnêtement, j'ai fait le plus gros du boulot. Sans moi, on n'aurait pas pu rentrer dans les délais.`,
    `__WAIT__`,
    `__FIRSTSCENE__`,
    `__FIRSTSCENE__`,
    `__FIRSTSCENE__`,
    `__FIRSTSCENE__`,
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
    `(Collègue) : Il va encore s'attribuer le mérite de notre travail...`,
    `(Collègue) : Chut. Ils sont là.`,
    `__STOP__`,
    `(Collègue) : *chuchote* Qui lui en parle ?``__BOSSBACK__`,
    `(Patron) : Je suis très fier de toi, ${gameData.relouName}. Tu as fait un travail fantastique comme chef de projet.`,
    `(${gameData.playerName}) : En fait...`,
    `(${gameData.relouName}) : Oh, vous savez, ce n'était pas grand-chose. Je n'ai fait que donner toutes les directives et abattre la moitié du travail.`,
    `(Autres collègues) : ...`,
    ` (Patron) : Ne sois pas si modeste.`,
    `__WAIT__`,
    `__SECONDSCENE__`,
    `(réunion des dirigeants)`,
    `(Patron) : Je pense que ${gameData.relouName} fait vraiment un travail fantastique. Il l'a démontré chaque jour depuis son arrivée.`,
    `(Patron) : Je propose donc de le promouvoir au rang de manager. Il peut gérer facilement de plus grosses équipes.`,
    `__ENDSCENE__`,
    `__WAIT__`,
    `__BOSSTURN__`,
    `(Patron) : Je compte sur toi pour ce projet, ${gameData.relouName}. Je suis sûr que tu t'en sortiras très bien, comme pour les autres.``__BOSSTURN__`,
    `(${gameData.relouName}) : Évidemment.`,
    `(Autres collègues) : ...`,
  ];

  advanceCutScene(secondLvlTxt);
}

export {
  cutsceneIntro,
  cutsceneFailedLevel,
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
};
