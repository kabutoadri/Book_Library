
import { GOOGLE_API_KEY } from '../config.js';

// Configuration Axios
const api = window.axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    timeout: 15000
});

/**
 * Recherche des livres sur Google Books.
 *
 * @param {string} query - Texte recherché
 * @returns {Promise<Object>} Réponse de l'API
 */
export async function searchBooks(query) {

    const searchQuery = query.trim();

    if (!searchQuery) {
        throw new Error('La recherche ne peut pas être vide.');
    }

    if (!GOOGLE_API_KEY) {
        throw new Error('La clé Google Books API est manquante.');
    }

    try {

        const response = await api.get('/volumes', {
            params: {
                q: searchQuery,
                key: GOOGLE_API_KEY,
                printType: 'books',
                maxResults: 10,
                orderBy: 'relevance'
            }
        });

        return response.data;

    } catch (error) {

        console.error(
            'Erreur lors de la requête Google Books :',
            error.response?.data || error.message
        );

        throw error;
    }
}
