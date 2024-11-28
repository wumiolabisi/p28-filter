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

    let buttonContainer = document.createElement("div");
    buttonContainer.id = "p28f-load-more-btn-container";

    let buttonElement = document.createElement("button");
    buttonElement.id = "p28f-load-more";
    buttonElement.value, buttonElement.innerHTML = text;

    return buttonContainer.appendChild(buttonElement);

}