<template>
    <article class="book-info">
    <!-- Lien de retour -->
    <RouterLink to="/" class="back-link">
            ← Retour aux résultats
        </RouterLink>

    <!-- Affichage de la couverture du livre -->
    <div class="book-info-image">
        <img
            v-if="props.book.imageLinks?.thumbnail"
            :src="props.book.imageLinks.thumbnail"
            :alt="`Couverture de ${props.book.title}`"
        >
        <p v-else>Couverture indisponible</p>
    </div>

    <!-- Affichage des informations principales du livre -->
    <div class="book-info-content">

        <!-- Affichage du titre -->
        <h1>{{ props.book.title || 'Titre inconnu' }}</h1>
        <!-- Affichage du ou des auteurs -->
        <p>{{ (props.book.authors || []).join(', ') || 'Auteur inconnu' }}</p>
        
        <!-- Caractéristiques du livre -->
        <div class="book-metadata">

            <!-- Année de publication -->
            <div>
                <span>Année</span>
                <p>{{ props.book.publishedDate?.split('-')[0] || 'Inconnue' }}</p>
            </div>

            <!-- Éditeur -->
            <div>
                <span>Éditeur</span>
                <p>{{ props.book.publisher || 'Inconnu' }}</p>
            </div>

            <!-- ISBN -->
            <div>
                <span>ISBN</span>
                <p>
                    {{
                        props.book.industryIdentifiers?.find(
                            identifier => identifier.type === 'ISBN_13'
                        )?.identifier || 'Non disponible'
                    }}
                </p>
            </div>

            <!-- Nombre de pages -->
            <div>
                <span>Nombre de pages</span>
                <p>{{ props.book.pageCount || 'Non renseigné' }}</p>
            </div>

            <!-- Langue -->
            <div>
                <span>Langue</span>
                <p>{{ props.book.language || 'Non renseignée' }}</p>
            </div>

            <!-- Format -->
            <div>
                <span>Format</span>
                <p>{{ props.book.printType || 'Non renseigné' }}</p>
            </div>
        </div>
    </div>

    <div class="book-extra-info">

    <section class="book-description">
        <h2>À propos du livre</h2>
        <div v-if="props.book.description">
        <p
            class="book-description-text"
            :class="{ 'description-expanded': isDescriptionExpanded }"
        >
            {{ props.book.description }}
        </p>

        <button
            class="read-more-button"
            @click="isDescriptionExpanded = !isDescriptionExpanded"
        >
            {{ isDescriptionExpanded ? 'Lire moins' : 'Lire davantage' }}
        </button>
    </div>

    <p v-else>Aucune description disponible.</p>
    </section>

    <section class="book-categories">
        <h2>Catégories</h2>

        <div v-if="props.book.categories?.length">
            <span
                v-for="category in props.book.categories"
                :key="category"
                class="category-tag"
            >
                {{ category }}
            </span>
        </div>

        <p v-else>Aucune catégorie renseignée.</p>
    </section>

</div>
    </article>
</template>

<script setup>
// Import de ref pour créer des variables réactives
import { ref } from 'vue';

// Récupération des informations du livre transmises par le composant parent BookDetailView.vue
   const props = defineProps ({
    book: {
            type: Object,
            required: true
        }
   });

// Permet de savoir si la description complète du livre est affichée ou réduite
const isDescriptionExpanded = ref(false);
</script>


