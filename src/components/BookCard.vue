<template>
        <article class="book-card">
        <div class="book-image">
            <img 
                v-if="book.imageLinks && book.imageLinks.thumbnail" 
                :src="book.imageLinks.thumbnail"
                :alt="book.title"
            >
            <p v-else>
                Couverture indisponible
            </p>
            </div>
            <h2>{{book.title}}</h2>
            <p>{{ (book.authors || []).join(', ') }}</p>
            <p>{{(book.publishedDate || '').split('-')[0]||'Année inconnue'}}</p>

            <!-- Bouton permettant d'accéder à la page de détails du livre sélectionné -->
            <button 
            class="book-details-button"
            @click="$router.push(`/books/${bookId}`)">
                Voir les détails
            </button>
        </article>
</template>

<script>
   export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true
        },
        bookId:{
            type: String,
            required: true
        }
    },
};
</script>
