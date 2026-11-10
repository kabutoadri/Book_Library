# Book_Library
Librairie de livre

Base Vue 3 pour une application de recherche de livres avec Google Books API.

## Démarrer

```bash
npm install
cp .env.example .env
npm run dev
```

La clé API est facultative pour commencer. Si vous en utilisez une, renseignez `VITE_GOOGLE_BOOKS_API_KEY` dans `.env`. Une clé utilisée dans une application frontend est visible par les visiteurs : restreignez-la aux API et aux domaines nécessaires dans Google Cloud.

## Arborescence

```text
src/
├── api/                  # Client HTTP et fonctions Google Books
├── components/
│   ├── books/             # Carte et liste de livres
│   ├── feedback/          # Chargement, erreur et absence de résultats
│   ├── navigation/        # Pagination
│   └── search/            # Formulaire de recherche et tri
├── router/                # Routes recherche et détail
├── stores/                # État Pinia pour recherche et détail
├── utils/                 # Traduction des erreurs API
├── views/                 # Pages de l'application
├── App.vue
├── main.js
└── styles/
```

## Recherche Google Books

Le service appelle `GET https://www.googleapis.com/books/v1/volumes` avec `q`, `printType=books`, `startIndex`, `maxResults` et `orderBy`. La taille de page est fixée à 20 (l'API accepte au maximum 40). Les termes avancés de l'API, comme `intitle:` et `inauthor:`, peuvent être saisis directement dans le champ de recherche.

La réponse est normalisée dans le store à partir de `totalItems` et `items`. Les états `loading`, `error`, `hasSearched` et `books.length === 0` pilotent séparément l'affichage du chargement, des erreurs et des résultats vides.

## Responsabilités principales

- `src/api/googleBooks.js` : configuration Axios et accès aux volumes.
- `src/stores/books.js` : requête, pagination, tri et état de recherche.
- `src/stores/bookDetails.js` : récupération d'un volume par son identifiant.
- `src/views/SearchView.vue` : composition du formulaire, des résultats et des états.
- `src/views/BookDetailsView.vue` : page de détail accessible via `/books/:id`.
- `src/utils/apiError.js` : messages utilisateur pour les erreurs réseau et HTTP.
