
import { createRouter, createWebHashHistory } from 'vue-router';

import SearchView from '../views/SearchView.js';
import BookDetailView from '../views/BookDetailView.js';

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
