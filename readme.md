# Project Nightmare - Deadline Invaders

<div align="center">

**Jeu vidéo de type Space Invaders revisité dans l'univers humoristique du monde de l'entreprise.**

</div>

## Aperçu

Project Nightmare - Deadline Invaders est un jeu vidéo rétro entièrement développé en HTML, CSS et JavaScript. Inspiré du classique Space Invaders, le jeu transpose l'action dans un bureau où le joueur doit contribuer à un projet tout en évitant un "collègue relou" qui sabote le travail de l'équipe.
C'est un projet d'études en groupe développé dans le cadre de la formation à Zone01, visant à créer un jeu complet avec game design, animations, et mécaniques de gameplay.

## Concept

Dans Project Nightmare, vous incarnez un développeur qui doit faire avancer un projet d'entreprise. Vos collègues défilent à l'écran et vous leur envoyez des éléments de projet (lignes de code) pour progresser. Mais attention : parmi eux se cache un collègue relou qui s'approprie le mérite du travail des autres et sabote le projet !

- **Objectif** : Terminer chaque niveau avec plus de 50% de contributions positives au projet
- **Progression** : Trois niveaux avec promotions successives + cinématique de fin
- **Victoire parfaite** : Atteignez 100% de réussite sur tous les niveaux pour débloquer la cinématique spéciale

## Fonctionnalités

- **Personnalisation** : Choisissez le nom du collègue relou et du joueur
- **Trois niveaux de difficulté croissante** : Le collègue relou apparaît de plus en plus fréquemment
- **Mode sans fin** : Jouez en continu pour battre votre meilleur score
- **Système de vies** : 3 vies pour réussir le jeu, avec possibilité de recommencer les niveaux
- **Power-ups variés** : 
  - Collègue diplomate (pause temporaire)
  - Team building (le collègue relou devient temporairement positif)
  - Dénonciation (retire un collègue relou)
  - Boost de productivité (double les points)
  - Cafféine (accélère les déplacements)
  - Backup (retire du pourcentage négatif)
- **Cinématiques narratives** : Histoire évolutive selon votre progression et vos performances
- **Menu pause complet** : Reprendre, recommencer le niveau ou le jeu, ajuster les options
- **Système de high scores** : Enregistrement et consultation des meilleurs scores
- **Musiques et effets sonores 8-bit** : Ambiance rétro gaming authentique
- **Graphismes pixel art** : Personnages et environnements en style rétro

## Technologies utilisées

**Language & Design:**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![Pixel Art](https://img.shields.io/badge/Pixel_Art-Design-ff69b4?style=for-the-badge)](https://en.wikipedia.org/wiki/Pixel_art)

## Utilisation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Go (pour l'API de gestion des scores)

### Installation

1.  **Cloner le repo**
```bash
    git clone https://github.com/JadeJLC/Project-Nightmare---Deadline-Invaders.git
    cd Project-Nightmare---Deadline-Invaders
```

2.  **Lancer l'API de gestion des scores**
```bash
    go run main.go
```

3.  **Ouvrir le jeu**
    
    Ouvrez le fichier `index.html` dans votre navigateur, ou utilisez un serveur local :
```bash
    # Avec Python 3
    python -m http.server 8000
    
    # Ou avec Node.js (si http-server est installé)
    npx http-server
```
    
    Puis accédez à `http://localhost:8000`

### **Contrôles**

- **Flèches directionnelles** : Déplacer le personnage
- **Barre d'espace** : Tirer / Envoyer du travail
- **I** : Détails des power-ups possédés
- **W, X, C, V, B, N, ?** : utilisation des power-ups
- **P ou Échap** : Mettre en pause

### **Comment jouer**

1. **Configuration** : Entrez votre nom et celui du collègue relou
2. **Gameplay** : 
   - Déplacez-vous horizontalement en bas de l'écran
   - Tirez sur les collègues normaux pour faire avancer le projet (barre verte)
   - Évitez de tirer sur le collègue relou (barre rouge)
3. **Objectif** : Terminez chaque niveau avec plus de 50% de contributions positives
4. **Power-ups** : Collectez et utilisez stratégiquement les bonus
5. **Progression** : Réussissez les 3 niveaux pour voir la fin de l'histoire, ou jouez en mode sans fin pour améliorer votre score

## Structure du projet
```
project-root/
├── images/         # Sprites et graphismes pixel art
├── musiques/       # Musiques 8-bit et effets sonores
├── page/           # Pages HTML du jeu
├── ressources/     # Assets et ressources diverses
├── scripts/        # Logique du jeu en JavaScript
├── main.go         # API Go pour la gestion de la base de données des scores
├── scripts.zip     # Archive des scripts
└── readme.md       # Ce fichier
```

## Development

### Architecture du jeu

- **Frontend** : HTML, CSS et JavaScript vanilla pour le gameplay
- **API** : API Go pour la gestion et la persistance des scores
- **Boucle de jeu** : 60 FPS avec requestAnimationFrame
- **Gestion des collisions** : Détection précise pour les tirs et power-ups
- **Système de score** : Calcul du pourcentage de contribution positive/négative avec sauvegarde persistante

### Optimisation des performances

- Limitation du nombre d'entités à l'écran
- Réutilisation des objets plutôt que création/destruction
- Optimisation des calculs de collision
- Sprites pré-chargés pour éviter les lags

## Apprentissages clés

Ce projet permet de développer des compétences dans :

- Développement de jeux vidéo en JavaScript vanilla
- Gestion de la boucle de jeu et du framerate
- Programmation orientée objet (classes pour entités)
- Gestion des événements et des entrées utilisateur
- Game design et équilibrage de difficulté
- Animation et graphismes pixel art
- Intégration audio (musiques et effets sonores)
- Narration interactive avec cinématiques
- API Go pour la persistance des données

## Autres informations

- Ce projet est un projet de groupe développé dans le cadre de ma formation à Zone01.
- L'objectif était de créer un jeu vidéo complet de A à Z avec game design, développement et assets.
- Inspiré du classique Space Invaders mais avec une twist humoristique sur le monde du travail.

## Améliorations futures

- [ ] Niveaux de difficulté ajustables (facile, normal, difficile)
- [ ] Nouveaux environnements de travail (designer, marketing, etc.)
- [ ] Niveaux supplémentaires
- [ ] Nouvelles équipe (skins des personnages)
- [ ] Plus de power-ups
- [ ] Tableau des scores hébergé en ligne
- [ ] Déploiement du jeu

<div align="center">

Par [JadeJLC](https://github.com/JadeJLC), [Nathan Paccoud](https://github.com/NathPacc), [Clara Hiesse](https://github.com/clarahiesse), [Valentine Ladjyn](https://github.com/vladjyn)

</div>
