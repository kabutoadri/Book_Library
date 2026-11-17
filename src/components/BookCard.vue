<template>
        <article class="book-card">
        <img v-if="book.imageLinks && book.imageLinks.thumbnail" :src="book.imageLinks.thumbnail">  <p v-else>Couverture indisponible</p>
        <h2>{{book.title}}</h2>
        <p>{{ (book.authors || []).join(', ') }}</p>
        <p>{{(book.publishedDate || '').split('-')[0]||'Année inconnue'}}</p>

        </article>
</template>

<script>
   export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true
        }
    },
};
</script>
