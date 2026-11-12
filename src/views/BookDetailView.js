
export default {
    name: 'BookDetailsView',

    props: {
        workId: {
            type: String,
            required: true
        }
    },

    template: `
        <section class="details-page">

            <RouterLink to="/" class="back-link">
                ← Retour aux résultats
            </RouterLink>

            <h1>Détails du livre</h1>

            <p>Identifiant du livre : {{ workId }}</p>

            <div class="placeholder">
                Les informations du livre seront affichées ici.
            </div>

        </section>
    `
};
