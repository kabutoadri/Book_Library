
<script setup>
import { ref } from 'vue';

import SearchBar from '../components/SearchBar.vue';
import { searchBooks } from '../services/googleBooksApi.js';
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loading = ref(false)

// Message d'erreur affiché à l'utilisateur
const errorMessage = ref('');

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

        // Affichage de la réponse complète dans la console
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
            
            <!-- Composant de chargement -->
            <LoadingSpinner
                :loading="loading"
                message="Recherche en cours..."
                :delay="300"
            />

            <!-- Affichage des erreurs -->
            <p
                v-if="errorMessage"
                class="search-error"
                role="alert"
            >
                {{ errorMessage }}
            </p>

        </div>

    </section>
</template>