
/**
 * Trie une liste de livres selon le critère sélectionné.
 *
 * @param {Array} books - Liste des livres Google Books
 * @param {string} sortOrder - Critère de tri
 * @returns {Array} Nouvelle liste triée
 */
export function sortBooks(books, sortOrder) {

    // Copie du tableau original pour ne pas le modifier
    const sorted = [...books];

    switch (sortOrder) {

        // Conserve l'ordre initial de Google Books
        case 'relevance':
            return sorted;

        // Tri alphabétique A-Z
        case 'title-asc':
            return sorted.sort((a, b) => {

                const titleA = a.volumeInfo?.title || '';
                const titleB = b.volumeInfo?.title || '';

                return titleA.localeCompare(titleB, 'fr', {
                    sensitivity: 'base'
                });
            });

        // Tri alphabétique Z-A
        case 'title-desc':
            return sorted.sort((a, b) => {

                const titleA = a.volumeInfo?.title || '';
                const titleB = b.volumeInfo?.title || '';

                return titleB.localeCompare(titleA, 'fr', {
                    sensitivity: 'base'
                });
            });

        // Tri par date, du plus récent au plus ancien
        case 'date-desc':
            return sorted.sort((a, b) => {

                const dateA = Date.parse(
                    a.volumeInfo?.publishedDate || ''
                );

                const dateB = Date.parse(
                    b.volumeInfo?.publishedDate || ''
                );

                const validA = Number.isNaN(dateA) ? null : dateA;
                const validB = Number.isNaN(dateB) ? null : dateB;

                // Les livres sans date sont placés à la fin
                if (validA === null && validB === null) return 0;
                if (validA === null) return 1;
                if (validB === null) return -1;

                return validB - validA;
            });

        default:
            return sorted;
    }
}
