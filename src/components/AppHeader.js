
export default {
    name: 'AppHeader',

    template: `
        <header class="site-header">

            <div class="container header-content">

                <RouterLink to="/" class="logo">
                    Book Library
                </RouterLink>

                <nav class="main-nav">
                    <RouterLink to="/" class="nav-link">
                        Recherche de livres
                    </RouterLink>

                    
                </nav>

            </div>

        </header>
    `
};
