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
    `(Patron) Je ne comprends pas. Vous êtes supposés être compétents !`,
    `(${gameData.relouName}) J'ai essayé de leur expliquer comment faire, mais ils n'ont pas voulu m'écouter.`,
    `(Autres collègues) Tu n'as pas...`,
    `(Patron) Je me fiche de vos justifications. Le client nous a donné une seconde chance. Ne la gâchez pas.`,
  ];

  advanceCutScene(failedTxt);
}

function cutsceneEndFirstLevel() {
  const firstLvlTxt = [
    ``,
    `(Patron) Bravo à tous. Le client est satisfait de nos résultats.`,
    `(${gameData.playerName}) Mer...`,
    `(${gameData.relouName}) Merci. Ce n'était pas toujours facile de coordonner l'équipe mais j'ai bien réussi.`,
    `(${gameData.playerName}) ...`,
    `(Autres collègues) ...`,
    `(${gameData.relouName}) *chuchote* Honnêtement, j'ai fait le plus gros du boulot. Sans moi, on n'aurait pas pu rentrer dans les deadlines.`,
    `__FIRSTSCENE__`,
    `(Patron) Nous avons reçu une nouvelle commande. ${gameData.relouName} sera votre chef de projet.`,
    `(${gameData.playerName}) !!!`,
  ];

  if (lastLevel.score === 100) {
    firstLvlTxt[0] = `(Patron) Bravo à tous. Le client est très satisfait de nos résultats.`;
  }

  advanceCutScene(firstLvlTxt);
}

function cutsceneEndSecondLevel() {
  const secondLvlTxt = [
    ``,
    `(Patron) Je suis très fier de toi, ${gameData.relouName}. Tu as fait un travail fantastique comme chef de projet.`,
    `(${gameData.playerName}) En fait...`,
    `(${gameData.relouName}) Oh, vous savez, ce n'était pas grand-chose. Je n'ai fait que donner toutes les directives et abattre la moitié du travail.`,
    `(Autres collègues) ...`,
    ` (Patron) Ne soyez pas si modeste.`,
    `__SECONDSCENE__`,
    `Patron) Je pense que ${gameData.relouName} fait vraiment un travail fantastique. Il l'a démontré chaque jour depuis son arrivée.`,
    `__WAIT__`,
    `(Patron) Je propose donc de le promouvoir au rang de manager. Il peut gérer facilement de plus grosses équipes.`,
  ];

  advanceCutScene(secondLvlTxt);
}

export {
  cutsceneIntro,
  cutsceneFailedLevel,
  cutsceneEndFirstLevel,
  cutsceneEndSecondLevel,
};
