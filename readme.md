# Make your game - présentation du projet

Création d'un jeu entièrement en HTML/CSS/JS sur le modèle d'un jeu rétro.
Base choisie : Space Invader.

## Concept - Project Nightmare : Deadline Invaders

- Project Nightmare se situe dans le contexte d'une entreprise ou un collègue particulier vole et sabote le travail des autres, puis s'attribue le mérite de la réussite du projet commun sur les choses se passent bien.
- Le joueur peut choisir le nom du collègue.
- Le mode "de base" se situe dans une équipe de développeurs. Il sera à terme possible de choisir l'environnement selon plusieurs métiers prédéfinis.
- Le jeu fonctionne comme un Space Invader : les collègues "normaux" se déplacent sur l'écran et le joueur "tire" en leur envoyant des éléments de projets (lignes de code dans le mode par défaut). Chaque élément envoyé permet d'avancer le pourcentage du projet (en vert/blanc). Entre les collègues normaux, le collègue "relou" apparaît. Si le joueur tire dessus, le pourcentage de projet saboté (en rouge) augmente.
- Pour gagner un niveau, il faut terminer le projet en ayant plus de 50% d'apports productifs. Si le joueur perd un niveau, il perd une vie et recommence le niveau. Une fois toutes les vies épuisées, le jeu s'arrête et il faut reprendre de zéro.
- Le jeu est de base composé de trois niveaux : collègue, chef de projet, manager. Le collègue relou apparaît plus souvent dans une ligne à mesure qu'on monte dans les niveaux (et potentiellement obtient des nouvelles capacités)
- Le joueur peut débloquer des bonus (collègue diplomate, se plaindre au patron, etc) pour impacter le collègue relou et augmenter ses propres chances de gagner.
- Le score total du joueur correspond au pourcentage validé dans chaque niveau. S'il obtient 100% à chaque niveau, il débloque une cinématique de fin spéciale où il rejoint la direction.
- Le jeu se termine par le collègue relou qui se fait renvoyer et tous les autres collègues qui font la fête pendant son pot de départ.

## Idées de design

- Musique 8-bit (pour rester dans le thème jeu rétro). Exemple de musiques possibles :

```
Niveaux :
https://pixabay.com/fr/music/jeux-vid%C3%A9o-arcade-beat-323176/
https://pixabay.com/fr/music/jeux-vid%C3%A9o-8-bit-gaming-background-music-358443/

Cinématiques :
Base : https://pixabay.com/fr/music/jeux-vid%C3%A9o-man-is-he-mega-glbml-22045/
Victoire : https://pixabay.com/fr/music/jeux-vid%C3%A9o-fun-with-my-8-bit-game-301278/
Défaite : https://pixabay.com/fr/music/ambiant-a-night-full-of-stars-peaceful-electronic-8-bitpiano-track-321551/
```

- Visuels en pixel art. Idées de référence :

```
https://i.pinimg.com/originals/8d/25/ec/8d25ec2293c7801097af5af4c7a17e71.gif
https://img.freepik.com/premium-vector/chibi-cute-human-figure-pixel-art-adorable-kawaii-character-male-female-different-skin-hair_418367-497.jpg
https://i.pinimg.com/736x/a3/e6/49/a3e64979cc76ec65a4893b5228d94d93.jpg
```

- Niveaux : personnage du joueur représenté par un personnage de dos à son bureau ? Autres collègues normaux dans le décor, collègue relou portant une casquette avec l'initiale de son prénom.

## Cinématiques

- Entre les niveaux, le collègue relou s'attribue le mérite de la réussite du projet et obtient une promotion.
- En cas de défaite à un niveau, le projet n'est pas fonctionnel et le patron s'énerve.
- En cas de game over, le collègue relou devient directeur (et renvoie le personnage joueur ?).
- En cas de victoire à tous les niveaux, le collègue relou se fait renvoyer (pot de départ, fête).
- En cas de parfait (100% sur tous les niveaux), le joueur devient directeur de la boîte.

## Niveaux

- Niveau 1 : 1 ou 2 collègues relous par ligne, les lignes avancent lentement.
- Niveau 2 : augmente le nombre d'apparition du collègue relou par ligne, accélèrent le déplacement des lignes
- Niveau 3 : encore plus d'apparition du collègue relou par ligne + ajout d'un malus (par exemple, accélération de la deadline au hasard)

## Power-ups

- Collègue diplomate : envoie le collègue diplomate négocier avec le collègue relou. Le mouvement des lignes s'interrompt temporairement et il devient plus facile d'avancer dans le projet.
- Team building : pendant une courte période, le collègue relou se montre un peu plus coopératif. Tirer dessus augmente le pourcentage positif du projet.
- Dénonciation : se plaint au patron pour faire avancer les choses. Un collègue relou est retiré de la ligne la plus proche du joueur.
- Boost de productivité : l'équipe est plus motivée. Double le pourcentage de projet attribué par chaque tir positif.
- Cafféine : un petit remontant pour tenir le coup. Accélère les déplacements du personnage joueur.

# Make your game - découpage des tâches

## Visuel

- **Créer les visuels** : collègues en pixel art, collègue relou, personnage principal, décors simples pour les cinématiques
- **Créer les cinématiques** : animations des personnages, ajout de la musique, écriture de petites lignes de dialogue
- **Musiques** : intégrer les musiques et les effets sonores
- **Interface** : affichage du pourcentage, du score total et du nombre de vies + menu pause (recommencer le niveau, recommencer le jeu, continuer, options si possible)
- **Structure HTML et CSS** : placer tous les éléments dans une structure HTML/CSS responsive et fonctionnelle

## Fonctionnel

- **Configuration de départ** : demander au joueur le nom du collègue et charger la bonne image + le nom dans les cinématiques
- **Mécaniques de base** : vitesse de déplacement des collègues et du joueur, vitesse de tir
- **Avancement du projet** : calcul et optimisation du pourcentage attribué par tir allié/ennemi, enregistrement du score entre chaque niveau
- **Intégration des animations** : mouvement des collègues sur l'écran, animation de tir, déplacement du personnage du joueur
- **Pause** : mécanique de mise en pause, sauvegarde des données pour relancer le jeu selon les demandes du joueur sur le menu

## Optimisation

- **Performance** : vérifier que le jeu reste à 60fps, assurer la performance
- **Difficulté** : optimisation de l'équilibre collègues normaux/collègue relou selon les niveaux
- **Vies** : nombre de vies raisonnable pour réussir le jeu sans qu'il soit trop facile (3)

## Bonus

- **Nom du joueur** : pour les cinématiques
- **Base de données "high score"** : pour comparer à ses scores précédents (multiplié par le nombre de vies restantes pour la rejouabilité ?)
- **Options** : couper/activer la musique (via le menu pause)
- **Difficulté** : niveau de difficulté ajustable (plus de vies, plus de pourcentage gagné par tir, etc)
- **Mode sans fin** : possibilité de jouer non-stop en dehors de l'histoire, le score augmente mais le niveau ne s'arrête qu'une fois toutes les vies épuisées

## Debug

- Intégrer des console.log pour suivre le fonctionnement du programme en temps réel.
- Essayer de créer un fichier test pour les fonctions plus mathématiques.
- Tester régulièrement les FPS en jouant au jeu.
- Finir le jeu au moins une fois chacun sans bugs ni ragequit.
