
<script setup>
import SearchBar from '../components/SearchBar.vue';
import { searchBooks } from '../services/googleBooksApi.js';

async function handleSearch(query) {

    console.log('Recherche envoyée :', query);

    try {

        // Appel de Google Books API
        const data = await searchBooks(query);

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
</template>
