
<script setup>
import { ref, watch, onUnmounted } from 'vue'
import '../css/LoadingSpinner.css'

// Propriétés transmises par le composant parent.
const props = defineProps({
    // Indique si un chargement est en cours.
    loading: {
        type: Boolean,
        required: true
    },

    // Message affiché sous l'animation.
    message: {
        type: String,
        default: 'Chargement en cours...'
    },

    // Délai avant l'apparition du spinner (en ms).
    delay: {
        type: Number,
        default: 300
    }
})

// Contrôle l'affichage réel du spinner.
const visible = ref(false)

// Timer utilisé pour retarder l'apparition.
let timer = null

// Surveille les changements de la propriété loading.
watch(
    () => props.loading,
    (isLoading) => {
        // Annule un éventuel timer précédent.
        clearTimeout(timer)
        timer = null

        if (isLoading) {
            // Attend le délai avant d'afficher le spinner.
            timer = setTimeout(() => {
                visible.value = true
                timer = null
            }, Math.max(0, props.delay))
        } else {
            // Masque le spinner dès la fin du chargement.
            visible.value = false
        }
    },
    { immediate: true }
)

// Nettoie le timer lorsque le composant est détruit.
onUnmounted(() => {
    clearTimeout(timer)
})
</script>

<template>
    <!-- Affiche le chargement uniquement lorsque visible est true. -->
    <div
        v-if="visible"
        class="loading-container"
        role="status"
        aria-live="polite"
    >
        <!-- Cercle animé. -->
        <div
            class="loading-spinner"
            aria-hidden="true"
        ></div>

        <!-- Message personnalisable. -->
        <p class="loading-message">
            {{ message }}
        </p>
    </div>
</template>
