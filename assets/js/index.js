import '../scss/style.scss';
import { button } from './ui-components/button';
import { handleDurationField } from './api/handleDurationField';
import { loadMorePosts } from './api/handleLoadMore';
import { gridResult } from './ui-components/gridResult';

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
 * 
 * 
 */

const p28SearchForm = document.getElementById('p28f-searchForm');
const p28ResultsArea = document.querySelector('div.p28f-results');
const p28ErrorArea = document.querySelector('div.p28f-error-container');
const p28EndMsgArea = document.querySelector('div.p28f-load-more-container');



/**
 * Fires the event
 */
if (p28SearchForm) {
    p28SearchForm.addEventListener('change', onSearchFormChange, false);
}

function onSearchFormChange(e) {

    e.preventDefault();

    let selectElements = document.getElementsByClassName("p28f-select");
    const data = {};

    // Récupération des valeurs du formulaire
    for (let element of selectElements) {

        if (element.value !== 'Sélectionnez') {
            data[element.name] = element.value;
        }

        if (element.name == "duree") {
            data['duree'] = handleDurationField(element.value);
        }

    }
    //console.log(data);

    // Création de la collection et envoi de la requête
    const allPosts = new wp.api.collections.Oeuvres();

    allPosts.fetch({
        data: {
            per_page: 5,
            ...data,
            _embed: true
        }

    }).then(p28ResultsArea.innerHTML = '<p class="p28f-loading">Chargement ...</p>', p28EndMsgArea.innerHTML = "").done(function (posts) {

        p28EndMsgArea.innerHTML = "";
        p28ResultsArea.innerHTML = "";
        posts.forEach(posts => {
            p28ResultsArea.innerHTML += gridResult(posts.id, posts.title.rendered, posts.link, posts._embedded['wp:featuredmedia'][0].source_url);
        });

        /**
         * Load More
         */
        if (allPosts.hasMore()) {
            p28EndMsgArea.innerHTML = button('Charger plus');


            let p28fLoadMoreButton = document.querySelector('button#p28f-load-more-btn');

            p28fLoadMoreButton.addEventListener('click', function () {

                p28fLoadMoreButton.style.display = "none";
                loadMorePosts(allPosts, p28ResultsArea, p28EndMsgArea);
            });

        } else {
            p28EndMsgArea.innerHTML = '<p>Fin des posts.</p>';
        }


    }).fail(function (error) {
        p28ErrorArea.innerHTML = '<p>Une erreur est survenue :' + error + '</p>';
    });



}

