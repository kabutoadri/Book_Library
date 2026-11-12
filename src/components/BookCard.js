export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    template: `
        <article class="book-card">
        <img v-if="book.imageLinks":src="book.imageLinks.thumbnail">  <p> v-else"Couverture indisponible"</p>
        {{book.title}},
        {{book.authors}},
        {{book.publishedDate}},

        </article>
    `
};