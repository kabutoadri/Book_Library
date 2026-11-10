
export default {
    name: 'SearchView',

    template: `
        <section class="search-page">

            <h1>Découvrez votre prochaine lecture</h1>

            <p>
                Recherchez des livres par titre, auteur ou ISBN.
            </p>

            <div class="placeholder">

                <p>La page de recherche sera développée ici.</p>

                <RouterLink
                    :to="{ name: 'book-details', params: { workId: 'demo' } }"
                    class="button"
                >
                    Tester la page détaillée
                </RouterLink>

            </div>

        </section>
    `
};
