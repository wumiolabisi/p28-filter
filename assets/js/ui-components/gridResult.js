/**
 *
 * Créer le résultat du post ID
 *
 * @param {int}     id   - Id du post
 * @param {string} title - Titre
 * @param {string} link  - Lien vers le post
 * @param {string} media - Lien vers l'image
 * 
 * @returns {HTMLCollection} - Le résultat mis en forme HTML.
 *
 * 
 */
export function gridResult(id, title, link, media) {

    return `<div class="p28f-result-item" id="p28f-post-${id}">
    <a href="${link}" target="_blank" title="Découvrez ${title}">
    <img class="p28f-thumbnail" alt="Affiche de l'oeuvre ${title}" src="${media}" />
    </a>
    </div>`;

}