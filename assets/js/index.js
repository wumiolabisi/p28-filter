import '../scss/style.scss';
import { retrievePosts } from './api/retrievePosts';

/**
 *
 * Gère la recherche d'oeuvre
 * avec l'API REST de WordPress
 *
 * @param       {HTMLCollection}   p28SearchForm     - Le formulaire de recherche
 * @param       {HTMLCollection}   p28ResultsArea    - La zone d'affichage des résultats
 * @param       {HTMLCollection}   p28ErrorArea      - La zone d'affichage en cas d'erreur de récupération de l'API
 * @param       {HTMLCollection}   p28EndMsgArea     - La zone prévue pour le message de fin de chargement des posts
 * @param       {EventListener}    e                 - L'évènement de changement du formulaire
 * @param       {HTMLCollection}   selectElements    - Les options sélectionnés par l'utilisateur
 * @param       {HTMLCollection}   filterBtn         - Le bouton qui permet de simuler un filtrage en version mobile
 * @param       {HTMLCollection}   triggerBtn        - Le bouton qui permet d'ouvrir le panneau de filtrage en version mobile
 * 
 * 
 */

const p28SearchForm = document.getElementById('p28f-searchForm');
const p28CountArea = document.querySelector('div.p28f-post-count');
const p28ResultsArea = document.querySelector('div.p28f-results');
const p28ErrorArea = document.querySelector('div.p28f-error-container');
const p28EndMsgArea = document.querySelector('div.p28f-load-more-container');
const filterBtn = document.querySelector("div#p28f-filter-mobile-only");
const triggerBtn = document.querySelector("div#p28f-trigger-mobile-only");

document.addEventListener('DOMContentLoaded', (e) => {
    retrievePosts(e, p28CountArea, p28EndMsgArea, p28ResultsArea, p28ErrorArea);
});


/**
 * Fires the event
 */
if (p28SearchForm) {

    p28SearchForm.addEventListener('change', (e) => {
        retrievePosts(e, p28CountArea, p28EndMsgArea, p28ResultsArea, p28ErrorArea);
    });

    p28SearchForm.classList.add("p28f-filtering-disappear");

    filterBtn.addEventListener('click', function () {

        filterBtn.innerHTML = "Chargement...";
        filterBtn.style.backgroundColor, filterBtn.style.borderColor = "grey";

        setTimeout(() => {
            p28SearchForm.classList.add("p28f-filtering-disappear");
            filterBtn.style.backgroundColor = "inherit";
            filterBtn.innerHTML = "Filtrer";
        }, 1000);


    });

    triggerBtn.addEventListener('click', function () {
        p28SearchForm.classList.add("p28f-filtering-area-for-mobile");
        p28SearchForm.classList.remove("p28f-filtering-disappear");

    });

}


