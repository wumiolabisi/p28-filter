import '../scss/style.scss';
import { button } from './ui-components/button';
import { gridResult } from './ui-components/gridResult';
import { handleDurationField } from './api/handleDurationField';
import { handleResponse, loadMorePosts } from './api/handleResponse';
import { errorMsg } from './ui-components/errorMsg';
import { endMsg } from './ui-components/endMsg';

/**
 * Fires the event
 */
const p28SearchForm = document.getElementById('p28f-searchForm');

if (p28SearchForm) {
    p28SearchForm.addEventListener('change', onSearchFormChange, false);
}

function onSearchFormChange(e) {

    e.preventDefault();
    const displayArea = document.querySelector('div.p28f-results');

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
    }).then(displayArea.innerHTML +=
        '<p class="p28f-loading">Chargement ...</p>'

    ).done(function (posts) {


        displayArea.innerHTML = "";
        handleResponse(posts, displayArea);

        /**
         * Load More
         */
        if (allPosts.hasMore()) {

            displayArea.after(button('Charger plus'));

            let p28fLoadMoreButton = document.querySelector('button#p28f-load-more');

            p28fLoadMoreButton.addEventListener('click', function () {

                p28fLoadMoreButton.style.display = "none";
                loadMorePosts(allPosts, displayArea);
            });

        } else {
            displayArea.after(endMsg());
        }



    }).fail(function (error) {
        displayArea.after(errorMsg(error));
    });



}

