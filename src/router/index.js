
import { createRouter, createWebHashHistory } from 'vue-router';
// Importation des vues
import SearchView from '../views/SearchView.vue';
import BookDetailView from '../views/BookDetailView.vue';

// Définition des routes
const routes = [
    {
        path: '/',
        name: 'search',
        component: SearchView
    },
    {
        path: '/books/:workId',
        name: 'book-details',
        component: BookDetailView,
        props: true
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
