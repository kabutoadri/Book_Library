import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const RESULTS_PER_REQUEST = 20;
const MAX_RESULTS = 40;

// Configuration Axios
const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    timeout: 10000, // 10 secondes
});

/**
 * Recherche jusqu'à 40 livres sur Google Books.
 *
 * @param {string} query - Texte recherché
 * @returns {Promise<Object>} Réponse contenant les livres
 */
export async function searchBooks(query) {

    const searchQuery = query.trim();

    if (!searchQuery) {
        throw new Error('La recherche ne peut pas être vide.');
    }

    if (!API_KEY) {
        throw new Error('La clé Google Books API est manquante.');
    }

    try {

        let allBooks = [];
        let totalItems = 0;
        let startIndex = 0;

        // Récupération des résultats par groupes de 20
        while (allBooks.length < MAX_RESULTS) {

            const response = await api.get('/volumes', {
                params: {
                    q: searchQuery,
                    key: API_KEY,
                    printType: 'books',
                    maxResults: RESULTS_PER_REQUEST,
                    startIndex: startIndex,
                    orderBy: 'relevance'
                }
            });

            const data = response.data;

            totalItems = data.totalItems || 0;

            const books = data.items || [];

            // Arrêt si aucun résultat supplémentaire
            if (books.length === 0) {
                break;
            }

            allBooks.push(...books);

            // Mise à jour de l'index pour la prochaine requête
            startIndex += books.length;

            // Arrêt lorsque tous les résultats disponibles ont été récupérés
            if (startIndex >= totalItems) {
                break;
            }
        }

        return {
            kind: 'books#volumes',
            totalItems: totalItems,
            items: allBooks.slice(0, MAX_RESULTS)
        };
    } catch (error) {

        console.error(
            'Erreur lors de la requête Google Books :',
            error.response?.data || error.message
        );

        throw error;
    }
}


/**
 * Récupère les détails d'un livre à partir de son identifiant.
 *
 * @param {string} workId - Identifiant Google Books du livre
 * @returns {Promise<Object>} Informations du livre
 */
export async function getBookById(workId) {

    // Vérification : on s'assure que l'identifiant du livre existe
    if (!workId) {
        throw new Error("L'identifiant du livre est manquant.");
    }

    // Vérification : on s'assure que la clé API est disponible
    if (!API_KEY) {
        throw new Error('La clé Google Books API est manquante.');
    }

    try {

        // Envoi d'une requête GET à Google Books
        // L'identifiant du livre est ajouté à l'URL
        const response = await api.get(`/volumes/${workId}`, {
            // Transmission de la clé API en paramètre
            params: {
                key: API_KEY
            }
        });
         // Retourne les informations du livre reçues depuis Google Books
        return response.data;

    } catch (error) {
         // Affiche une erreur dans la console pour faciliter le débogage
        console.error(
            'Erreur lors de la récupération du livre :',
            error.response?.data || error.message
        );
        // Transmet l'erreur au composant qui a appelé cette fonction
        throw error;
    }
}
