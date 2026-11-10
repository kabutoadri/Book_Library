# Book_Library

Librairie de livres

```text
book-library/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── src/
    ├── main.js
    ├── App.js
    │
    ├── router/
    │   └── index.js
    │
    ├── views/
    │   ├── SearchView.js
    │   └── BookDetailsView.js
    │
    ├── components/
    │   ├── AppHeader.js
    │   ├── AppFooter.js
    │   ├── SearchBar.js
    │   ├── FilterPanel.js
    │   ├── BookCard.js
    │   └── Pagination.js
    │
    ├── services/
    │   └── openLibraryApi.js
    │
    ├── stores/
    │   ├── searchStore.js
    │   └── libraryStore.js
    │
    └── utils/
        └── bookMapper.js
```

## Organisation du projet

Le projet est organisé de manière modulaire afin de séparer les différentes responsabilités de l'application.

- **index.html** : point d'entrée de l'application.
- **css/** : contient la feuille de style principale `style.css`, qui regroupe les styles de l'ensemble du projet.
- **src/** : contient le code JavaScript de l'application Vue.js.
  - **main.js** : initialise l'application Vue.js.
  - **App.js** : définit la structure générale de l'application.
  - **router/** : gère la navigation entre les différentes pages.
  - **views/** : contient les vues principales, notamment la recherche et les détails d'un livre.
  - **components/** : regroupe les composants réutilisables de l'interface.
  - **services/** : centralise les communications avec l'API Open Library.
  - **stores/** : gère les données partagées entre les composants et les différentes vues.
  - **utils/** : contient les fonctions utilitaires, notamment la transformation des données reçues de l'API.

Cette organisation permet de faciliter la maintenance, la réutilisation du code et l'évolution du projet.