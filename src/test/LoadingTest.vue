
<script setup>
import { ref } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

// État du chargement.
const loading = ref(false)

// Résultat fictif.
const resultat = ref('')

// Simule une recherche de 3 secondes.
async function testerChargement() {
    loading.value = true
    resultat.value = ''

    try {
        // Simule le temps de réponse d'une API.
        await new Promise(resolve => setTimeout(resolve, 3000))

        resultat.value = 'Recherche terminée avec succès !'
    } finally {
        // Arrête le chargement.
        loading.value = false
    }
}
</script>

<template>
    <main class="test-container">
        <h1>Test du composant LoadingSpinner</h1>

        <!-- Lance la simulation. -->
        <button
            :disabled="loading"
            @click="testerChargement"
        >
            {{ loading ? 'Chargement...' : 'Lancer le test' }}
        </button>

        <!-- Composant de chargement. -->
        <LoadingSpinner
            :loading="loading"
            message="Recherche en cours..."
            :delay="300"
        />

        <!-- Affiche le résultat après le chargement. -->
        <p v-if="resultat">
            {{ resultat }}
        </p>
    </main>
</template>

<style scoped>
.test-container {
    text-align: center;
    padding: 60px 20px;
    font-family: Arial, sans-serif;
}

button {
    padding: 12px 24px;
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
