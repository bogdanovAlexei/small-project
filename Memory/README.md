# Jeu de mémoire

Petit jeu de mémoire réalisé en HTML, CSS et JavaScript. Le but est de retrouver les huit paires d’images en faisant le moins de coups possible.

## Fonctionnalités

- Plateau de 16 cartes, réparties en 8 paires.
- Images différentes chargées depuis Picsum.
- Compteur de coups et chronomètre.
- Les cartes non identiques se cachent après un court délai.
- Bouton pour recommencer la partie.

## Arborescence

Place les fichiers comme ceci :

```text
Memory/
├── index.html
├── script/
│   └── main.js
└── styles/
    └── style.css
```

Dans `index.html`, les chemins doivent correspondre à cette arborescence :

```html
<link rel="stylesheet" href="styles/style.css">
<script src="script/main.js" defer></script>
```

## Lancer le jeu

1. Vérifie que les trois fichiers sont dans les dossiers indiqués.
2. Ouvre `index.html` dans un navigateur.
3. Clique sur une carte pour commencer. Le chronomètre démarre au premier clic.
4. Clique sur **Recommencer** pour lancer une nouvelle partie.

Aucune installation n’est nécessaire. Une connexion Internet est requise pour charger les images depuis Picsum.

## Technologies

- HTML
- CSS (AI Generated)
- JavaScript
