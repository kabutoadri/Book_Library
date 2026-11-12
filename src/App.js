
import AppHeader from './components/AppHeader.js';
import AppFooter from './components/AppFooter.js';

export default {
    name: 'App',

    components: {
        AppHeader,
        AppFooter
    },

    template: `
        <div class="app-shell">

            <AppHeader />

            <main class="main-content">
                <RouterView />
            </main>

            <AppFooter />

        </div>
    `
};
