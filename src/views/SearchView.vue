
<script setup>
//Import de ref pour créer une variable réactive dans Vue
import { ref } from 'vue';
// Import des composants utilisés dans cette page
import SearchBar from '../components/SearchBar.vue';
import { searchBooks } from '../services/googleBooksApi.js';

// Import de la fonction qui permet d'interroger l'API Google Books
import BookCard from '../components/BookCard.vue';

//// Tableau réactif qui contiendra les livres récupérés depuis l'API
const books = ref([]);

async function handleSearch(query) {

    console.log('Recherche envoyée :', query);

    try {

        // Appel de Google Books API
        const data = await searchBooks(query);

        // Stockage des livres retournés dans notre tableau réactif
        books.value = data.items || [];

        // Affichage de la réponse complète
        console.log(
            'Réponse complète Google Books API :',
            data
        );

        // Informations générales
        console.log('Nombre total de résultats :', data.totalItems);

        console.log(
            'Nombre de livres retournés :',
            data.items?.length ?? 0
        );
        

    } catch (error) {

        if (error.response) {

            console.error(
                'Erreur API :',
                error.response.status,
                error.response.data
            );

        } else if (error.request) {

            console.error(
                'Erreur réseau :',
                error.message
            );

        } else {

            console.error(
                'Erreur de recherche :',
                error.message
            );

        }
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
        </div>
    

        <!-- Zone des résultats -->
            <div class="results-section">
                <div class="container">
            <!-- Grille contenant les cartes des livres trouvés -->
                <div class="books-grid">
            <!-- Création d'une carte pour chaque livre retourné par l'API -->
                <BookCard
                v-for="book in books"
                :key="book.id"
                :book="book.volumeInfo" />
                </div>
                </div>
            </div>

    </section>
</template>
