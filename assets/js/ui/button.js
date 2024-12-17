/**
 *
 * Créer le bouton Load More
 *
 * @param   {string} text    - Le texte du bouton
 * 
 * @returns {HTMLCollection} - La div p28f-load-more-btn-container avec son bouton
 *
 * 
 */
export function button(text) {


    let buttonElement = document.createElement("a");
    buttonElement.id = "p28f-load-more-btn";
    buttonElement.value, buttonElement.innerHTML = text;

    return buttonElement.outerHTML;

}