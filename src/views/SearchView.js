
import SearchBar from '../components/SearchBar.js';
import { searchBooks } from '../services/googleBooksApi.js';

export default {
    name: 'SearchView',

    components: {
        SearchBar
    },

    methods: {

        async handleSearch(query) {

            console.log('Recherche envoyée :', query);

            try {

                // Appel de Google Books API
                const data = await searchBooks(query);

                // Affichage de la réponse complète
                console.log(
                    'Réponse complète Google Books API :',
                    data
                );

                // Informations générales sur la réponse
                console.log('Nombre total de résultats :', data.totalItems);

                console.log(
                    'Nombre de livres retournés :',
                    data.items?.length ?? 0
                );

            } catch (error) {

                if (error.response) {

                    // Erreur HTTP retournée par Google
                    console.error(
                        'Erreur API :',
                        error.response.status,
                        error.response.data
                    );

                } else if (error.request) {

                    // Aucune réponse du serveur
                    console.error(
                        'Erreur réseau :',
                        error.message
                    );

                } else {

                    // Autre erreur (configuration, clé API, etc.)
                    console.error(
                        'Erreur de recherche :',
                        error.message
                    );

                }

            }
        }
    },

    template: `
        <section class="search-page container">

            <div class="search-hero">

                <p class="search-eyebrow">
                    VOTRE PROCHAINE HISTOIRE COMMENCE ICI
                </p>

                <h1>Découvrez votre prochaine lecture</h1>

                <p class="search-description">
                    Explorez des milliers de livres et gardez
                    vos découvertes à portée de main.
                </p>

                <SearchBar @search="handleSearch" />

            </div>

        </section>
    `
};
