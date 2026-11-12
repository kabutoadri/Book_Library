
export default {
    name: 'SearchBar',

    emits: ['search'],

    data() {
        return {
            query: ''
        };
    },

    methods: {
        submitSearch() {
            const searchQuery = this.query.trim();

            if (!searchQuery) {
                return;
            }

            // Transmission de la recherche au composant parent
            this.$emit('search', searchQuery);
        }
    },

    template: `
        <form class="search-bar" @submit.prevent="submitSearch">

            <input
                type="search"
                v-model="query"
                placeholder="Rechercher un livre, un auteur ou un ISBN..."
                aria-label="Rechercher un livre, un auteur ou un ISBN"
            >

            <button type="submit">
                Rechercher
            </button>

        </form>
    `
};
