import SearchBar from '../components/SearchBar.js';

export default {
    name: 'SearchView',
    
    components: {
        SearchBar
    },

    data() {
        return {
            submittedQuery: ''
        };
    },
    methods: {
        handleSearch(query) {
            this.submittedQuery = query;
            // Vous pouvez ajouter ici la logique pour effectuer la recherche réelle
            console.log('Recherche soumise :', query);
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

                <p v-if="submittedQuery" class="search-feedback">
                    Recherche saisie : {{ submittedQuery }}
                </p>

            </div>

        </section>
    `
};
