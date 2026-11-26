<template>
    <section class="search-page">

        <!-- =================================
             EN-TÊTE DE RECHERCHE
             ================================= -->

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

                    <!-- Barre de recherche -->
                    <SearchBar @search="handleSearch" />

                </div>

                <!-- Composant de chargement -->
                <LoadingSpinner
                    :loading="loading"
                    message="Recherche en cours..."
                    :delay="300"
                />

                <!-- Composant de gestion des erreurs -->
                <ErrorMessage :message="errorMessage" />

            </div>

        </div>


        <!-- =================================
             ZONE DES RÉSULTATS
             ================================= -->

        <div
            v-if="books.length > 0"
            class="results-section"
        >

            <div class="container">

                <!-- En-tête des résultats et menu de tri -->
                <div class="results-toolbar">

                    <div class="results-heading">

                        <h2>Résultats de recherche</h2>

                        <p>
                            {{ books.length }} livres récupérés
                        </p>

                    </div>

                    <!-- Composant de tri -->
                    <SortSelect v-model="sortOrder" />

                </div>


                <!-- Grille des livres -->
                <div class="books-grid">

                    <BookCard
                        v-for="book in paginatedBooks"
                        :key="book.id"
                        :book="book.volumeInfo"
                    />

                </div>


                <!-- =================================
                     PAGINATION
                     ================================= -->

                <div
                    v-if="totalPages > 1"
                    class="pagination"
                >

                    <!-- Bouton page précédente -->
                    <button
                        type="button"
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                    >
                        Précédent
                    </button>

                    <!-- Numéros des pages -->
                    <button
                        v-for="page in visiblePages"
                        :key="page"
                        type="button"
                        @click="currentPage = page"
                        :class="{ active: currentPage === page }"
                    >
                        {{ page }}
                    </button>

                    <!-- Bouton page suivante -->
                    <button
                        type="button"
                        @click="currentPage++"
                        :disabled="currentPage === totalPages"
                    >
                        Suivant
                    </button>

                </div>

            </div>

        </div>

    </section>
</template>


<script setup>
// Import des fonctions Vue
import { ref, computed, watch } from 'vue';

// Import des composants
import SearchBar from '../components/SearchBar.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import BookCard from '../components/BookCard.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import SortSelect from '../components/SortSelect.vue';

// Import du service Google Books API
import { searchBooks } from '../services/googleBooksApi.js';

// Import de la fonction de tri
import { sortBooks } from '../utils/bookSorting.js';


// =================================
// VARIABLES RÉACTIVES
// =================================

// État du chargement
const loading = ref(false);

// Message d'erreur affiché à l'utilisateur
const errorMessage = ref('');

// Tableau contenant les livres récupérés depuis l'API
const books = ref([]);

// Numéro de la page actuellement affichée
const currentPage = ref(1);

// Critère de tri sélectionné
const sortOrder = ref('relevance');

// Nombre de livres affichés par page
const booksPerPage = 10;


// =================================
// TRI DES RÉSULTATS
// =================================

// Liste des livres triés selon le critère sélectionné
const sortedBooks = computed(() => {
    return sortBooks(books.value, sortOrder.value);
});

// Retour à la première page lors d'un changement de tri
watch(sortOrder, () => {
    currentPage.value = 1;
});


// =================================
// PAGINATION
// =================================

// Indice du premier livre de la page actuelle
const startIndex = computed(() =>
    (currentPage.value - 1) * booksPerPage
);

// Indice de fin de la tranche (exclu)
const endIndex = computed(() =>
    startIndex.value + booksPerPage
);

// Livres à afficher sur la page actuelle
const paginatedBooks = computed(() => {

    return sortedBooks.value.slice(
        startIndex.value,
        endIndex.value
    );

});

// Nombre total de pages nécessaires
const totalPages = computed(() =>
    Math.ceil(sortedBooks.value.length / booksPerPage)
);

// Numéros de pages à afficher (maximum 4)
const visiblePages = computed(() => {
    const pages = [];

    for (let i = 1; i <= totalPages.value && i <= 4; i++) {
        pages.push(i);
    }

    return pages;
});


// =================================
// RECHERCHE GOOGLE BOOKS
// =================================

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

    // Activation du chargement
    loading.value = true;

    try {

        // Appel de Google Books API
        const data = await searchBooks(query);

        // Stockage des livres retournés
        books.value = data.items || [];

        // Vérification si aucun livre n'a été trouvé
        if (books.value.length === 0) {
            errorMessage.value =
                'Aucun livre trouvé pour cette recherche';
        }

        // Retour à la première page après chaque recherche
        currentPage.value = 1;

        // Retour au tri par pertinence
        sortOrder.value = 'relevance';

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

            // Réinitialisation des résultats précédents
            books.value = [];

            // Retour à la première page
            currentPage.value = 1;

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

        // Arrêt du chargement dans tous les cas
        loading.value = false;

    }
}
</script>
