<script setup>
//Import de ref pour créer une variable réactive dans Vue et computed pour recalculer les indices automatiquement lorsque currentPage change
import { ref, computed } from 'vue';
// Import des composants utilisés dans cette page
import SearchBar from '../components/SearchBar.vue';
import { searchBooks } from '../services/googleBooksApi.js';
// Import du composant de chargement
import LoadingSpinner from '../components/LoadingSpinner.vue'
// Import de la fonction qui permet d'interroger l'API Google Books
import BookCard from '../components/BookCard.vue';

const loading = ref(false)

// Message d'erreur affiché à l'utilisateur
const errorMessage = ref('');

//// Tableau réactif qui contiendra les livres récupérés depuis l'API
const books = ref([]);

// Numéro de la page actuellement affichée
const currentPage = ref(1);

// Nombre de livres affichés par page
const booksPerPage = 10;

// Indice du premier livre de la page actuelle
const startIndex = computed(() => (currentPage.value - 1) * booksPerPage);

// Indice de fin de la tranche (exclu)
const endIndex = computed(() => startIndex.value + booksPerPage);

// Livres à afficher sur la page actuelle
const paginatedBooks = computed(() => {
    const pageBooks = [];

    for (
        let i = startIndex.value;
        i < endIndex.value && i < books.value.length;
        i++
    ) {
        pageBooks.push(books.value[i]);
    }

    return pageBooks;
});
// Nombre total de pages nécessaires pour afficher tous les livres
const totalPages = computed(() =>
    Math.ceil(books.value.length / booksPerPage)
);

// Numéros de pages à afficher (maximum 4)
const visiblePages = computed(() => {
    const pages = [];

    for (let i = 1; i <= totalPages.value && i <= 4; i++) {
        pages.push(i);
    }

    return pages;
});

/**
 * Lance une recherche sur Google Books.
 *
 * @param {string} query - Texte recherché
 */
async function handleSearch(query) {

    // Réinitialisation du message précédent
    errorMessage.value = '';

    // Vérification du champ de recherche
    if (!query) {
        errorMessage.value =
            'Veuillez saisir le nom du livre recherché';

        return;
    }

    console.log('Recherche envoyée :', query);

    // Active le chargement juste avant l'appel API
    loading.value = true

    try {

        // Appel de Google Books API
        const data = await searchBooks(query);

        // Stockage des livres retournés dans notre tableau réactif
        books.value = data.items || [];

        // Vérification si aucun livre n'a été trouvé
        if (books.value.length === 0) {
            // Affichage d'un message informatif à l'utilisateur
            errorMessage.value = 'Aucun livre trouvé pour cette recherche';
        }
        // Revenir à la première page après chaque nouvelle recherche
        currentPage.value = 1;

        // Affichage de la réponse complète
        console.log(
            'Réponse complète Google Books API :',
            data
        );

        console.log(
            'Nombre total de résultats :',
            data.totalItems
        );

        console.log(
            'Nombre de livres retournés :',
            data.items?.length ?? 0
        );


    } catch (error) {

        // Détection d'un délai dépassé
        if (
            error.code === 'ETIMEDOUT' ||
            error.code === 'ECONNABORTED'

        ) {

            errorMessage.value =
                'Le délai de réponse a été dépassé';

        }

        // Détection d'une erreur retournée par l'API
        else if (error.response) {

            errorMessage.value =
                'Service de recherche indisponible';

        }

        // Détection d'un problème réseau
        else if (
            error.code === 'ERR_NETWORK' ||
            error.request
        ) {

            errorMessage.value =
                'Vérifiez votre connexion internet';

        }

        // Autres erreurs
        else {

            errorMessage.value =
                'Service de recherche indisponible';

        }

        // Informations techniques pour le développeur
        console.error('Détail de l’erreur :', error);
    } finally {

        // Arrête le chargement dans tous les cas,
        // que la recherche réussisse ou échoue.
        loading.value = false

    }
}
</script>


<template>
    <section class="search-page">
        <!-- En-tête de la page de recherche -->
        <div class="search-section">
            <div class="container">

                <div class="search-hero">

                    <p class="search-eyebrow">
                        VOTRE PROCHAINE HISTOIRE COMMENCE ICI
                    </p>

                    <h1>Découvrez votre prochaine lecture</h1>

                    <p class="search-description">
                        Explorez des milliers de livres et gardez
                        vos découvertes à portée de main.
                    </p>
                    <!-- Barre de recherche : transmet le terme recherché à handleSearch -->
                    <SearchBar @search="handleSearch" />
                </div>
            </div>

            <!-- Composant de chargement -->
            <LoadingSpinner :loading="loading" message="Recherche en cours..." :delay="300" />

            <!-- Affichage des erreurs -->
            <p v-if="errorMessage" class="search-error" role="alert">
                {{ errorMessage }}
            </p>

        </div>


        <!-- Zone des résultats -->
        <div class="results-section">
            <div class="container">

                <!-- Grille contenant les cartes des livres trouvés -->
                <div class="books-grid">

                    <!-- Création d'une carte pour chaque livre retourné par l'API -->
                    <BookCard v-for="book in paginatedBooks" :key="book.id" :book="book.volumeInfo" />
                </div>

                <!-- Navigation entre les pages -->
                <div v-if="totalPages > 1" class="pagination">

                    <!-- Bouton page précédente -->
                    <button type="button" @click="currentPage--" :disabled="currentPage === 1">
                        Précédent
                    </button>

                    <!-- Numéros des pages -->
                    <button v-for="page in visiblePages" :key="page" type="button" @click="currentPage = page"
                        :class="{ active: currentPage === page }">
                        {{ page }}
                    </button>

                    <!-- Bouton page suivante -->
                    <button type="button" @click="currentPage++" :disabled="currentPage === totalPages">
                        Suivant
                    </button>

                </div>
            </div>
        </div>

    </section>
</template>
