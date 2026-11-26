<template>
    <section class="details-page container">
        <!-- Message affiché pendant le chargement -->
        <p v-if="loading">Chargement des informations du livre...</p>
        <!-- Message affiché en cas d'erreur -->
        <p v-else-if="errorMessage" role="alert">
            {{ errorMessage }}
        </p>
        <!-- Affichage des informations du livre -->
        <BookInfo v-else-if="book" :book="book.volumeInfo" />

    </section>
</template>

<script setup>
// Import de ref pour créer des variables réactives et de watch pour surveiller les changements de l'identifiant du livre
import { ref, watch } from 'vue';
// Import des composants utilisés dans cette page
import BookInfo from '../components/BookInfo.vue';
import { getBookById } from '../services/googleBooksApi.js';

// Récupération des informations du livre transmises par le composant parent BookDetailView.vue
const props = defineProps({
    workId: {
        type: String,
        required: true
    }
});

// Stockage des informations du livre
const book = ref(null);

// Indique si les informations du livre sont en cours de chargement
const loading = ref(false);
// Contient le message d'erreur si la récupération échoue
const errorMessage = ref('');


// Fonction qui récupère les informations du livre
async function loadBook() {

    // Active l'indicateur de chargement
    loading.value = true;

    // Réinitialise le message d'erreur
    errorMessage.value = '';

    try {
        // Récupération des informations depuis Google Books
        const response = await getBookById(props.workId);

        // Stockage des informations du livre
        book.value = response;

    } catch (error) {

        // Affiche l'erreur dans la console
        console.error('Erreur lors du chargement du livre :', error);

        // Message destiné à l'utilisateur
        errorMessage.value = 'Impossible de récupérer les informations du livre.';

    } finally {

        // Arrête le chargement, que la requête ait réussi ou échoué
        loading.value = false;
    }
}

// Surveille l'identifiant du livre et déclenche son chargement
watch(() => props.workId, loadBook, { immediate: true });

</script>

