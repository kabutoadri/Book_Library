<template>
    <section class="details-page container">

        <RouterLink to="/" class="back-link">
            ← Retour aux résultats
        </RouterLink>

        <h1>Détails du livre</h1>

        <p>Identifiant du livre : {{ workId }}</p>

        <!-- Affichage des erreurs -->
        <ErrorMessage :message="errorMessage" />

        <div class="placeholder">
            Les informations du livre seront affichées ici.
        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue';

// Import du composant de gestion des erreurs
import ErrorMessage from '../components/ErrorMessage.vue';

// Réception de l'identifiant depuis Vue Router
defineProps({
    workId: {
        type: String,
        required: true
    }
});

// Message d'erreur affiché à l'utilisateur
const errorMessage = ref('');
</script>