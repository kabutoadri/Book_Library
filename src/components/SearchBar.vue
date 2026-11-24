<template>
    <form class="search-bar" @submit.prevent="submitSearch">

        <input type="search" v-model="query" placeholder="Rechercher un livre, un auteur ou un ISBN..."
            aria-label="Rechercher un livre, un auteur ou un ISBN">

        <button type="submit">
            Rechercher
        </button>

    </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const query = ref('');

function submitSearch() {

    // Transmission du texte au composant parent
    emit('search', query.value.trim());
}
</script>