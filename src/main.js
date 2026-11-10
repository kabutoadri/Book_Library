
import { createApp } from 'vue';

import App from './App.js';
import router from './router/index.js';

// Création de l'application Vue
const app = createApp(App);

// Configuration du routeur
app.use(router);

// Montage de l'application dans le HTML
app.mount('#app');
