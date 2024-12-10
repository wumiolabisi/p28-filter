/**
 *
 * Créer le résultat du post ID
 *
 * @param {int}     id       - Id du post
 * @param {string} title     - Titre
 * @param {string} link      - Lien vers le post
 * @param {string} media     - Lien vers l'image
 * @param {string} type      - Type de contenu retourné
 * @param {string} grid      - Bloc HTML de retour
 * 
 * @returns {HTMLCollection} grid - Le résultat mis en forme HTML.
 *
 * 
 */
export function gridResult(id, title, link, media, type = '') {

    let grid = '';

    if (typeof type === "string" && type.length === 0) {
        grid = `<div id="p28f-post-${id}" class="p28f-result-container">
                <div class="p28f-result-item">
                    <a href="${link}" target="_blank" title="Découvrez ${title}, les secrets de tournage, l'intention de la réalisatrice et plus encore">
                        <img class="p28f-thumbnail" alt="Affiche de l'oeuvre ${title}" src="${media}" />
                    </a>
                </div>
            </div>`;
    } else {
        grid = `<div id="p28f-post-${id}" class="p28f-result-container">
        <div class="p28f-result-item-real">
            <a href="${link}" target="_blank" title="Découvrez la réalisatrice ${title}">
                <img class="p28f-thumbnail" alt="Découvrez le portrait de la réalisatrice ${title}" src="${media}" />
            </a>
        </div>
    <div class="p28f-result-item-title">
            <a href="${link}" class="p28-link-effect" target="_blank" title="Cliquez ici pour découvrir ${title}">
                <h3>${title}</h3>
            </a>
        </div>
    </div>`;

    }

    return grid;


}