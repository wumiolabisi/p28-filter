import '../scss/style.scss';
import { button } from './ui/button';
import { handleDurationField } from './api/handleDurationField';
import { loadMorePosts } from './api/handleLoadMore';
import { gridResult } from './ui/gridResult';

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

document.addEventListener('DOMContentLoaded', retrievePosts);


/**
 * Fires the event
 */
if (p28SearchForm) {

    p28SearchForm.addEventListener('change', retrievePosts, false);

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

function retrievePosts(e) {

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

    if (document.querySelector("input#p28f-taxonomy") && document.querySelector("input#p28f-taxonomy-term-id")) {

        const p28fTaxonomy = document.getElementById("p28f-taxonomy").value;
        const p28fTaxonomyTerm = document.getElementById("p28f-taxonomy-term-id").value;
        data[p28fTaxonomy] = p28fTaxonomyTerm;
    }

    // Création de la collection et envoi de la requête
    const allPosts = new wp.api.collections.Oeuvres();

    allPosts.fetch({
        data: {
            per_page: 8,
            ...data,
            _embed: true
        }

    }).then(
        p28ResultsArea.innerHTML = '<p class="p28f-loading">Chargement ...</p>',
        p28EndMsgArea.innerHTML = ""
    ).done(function (posts) {


        p28ResultsArea.innerHTML = "";

        if (allPosts.state.totalObjects === 0) {
            p28CountArea.innerHTML = "";

            p28EndMsgArea.innerHTML = "<p>Il n'y a pas de posts correspondant à votre recherche.</p>";

        } else {
            p28CountArea.innerHTML = "<p>" + allPosts.state.totalObjects + " fiches trouvées</p>";
            posts.forEach(post => {

                p28ResultsArea.innerHTML += gridResult(post.id, post.title.rendered, post.link, post.acf.affiche_url);

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
        }





    }).fail(function (error) {
        p28ErrorArea.innerHTML = '<p>Une erreur est survenue :' + error + '</p>';
    });



}

