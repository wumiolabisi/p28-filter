import '../scss/style.scss';

/**
 * Fires the event
 */
const p28SearchForm = document.getElementById('p28f-searchForm');

if (p28SearchForm) {
    p28SearchForm.addEventListener('change', onSearchFormChange, false);
}

function onSearchFormChange(e) {

    e.preventDefault();
    const elmnt = document.querySelector('div.p28f-results');

    let selectElements = document.getElementsByClassName("p28f-select");
    const data = {};

    // Récupération des valeurs du formulaire
    for (let element of selectElements) {

        if (element.value !== 'Sélectionnez') {
            data[element.name] = element.value;
        }

        if (element.name == "duree") {
            data['duree'] = DureeAcf(element.value);
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
    }).then(elmnt.innerHTML += '<p class="p28f-loading">Chargement ...</p>').done(function (posts) {


        elmnt.innerHTML = "";


        posts.forEach(post => {

            elmnt.innerHTML += `<div class="p28f-result-item" id="p28f-post-${post.id}">
            <a href="${post.link}" target="_blank" title="Découvrez ${post.title.rendered}">
            <img class="p28f-thumbnail" alt="Affiche de l'oeuvre ${post.title.rendered}" src="${post._embedded['wp:featuredmedia'][0].source_url}" />
            </a>
            </div>`;
        });



        /**
         * Load More
         */
        if (allPosts.hasMore() != null) {

            console.log(allPosts.hasMore);

            elmnt.innerHTML += "<button id='p28f-load-more'>Charger plus</button>";

            let p28fLoadMoreButton = document.querySelector('button#p28f-load-more');

            p28fLoadMoreButton.addEventListener('click', function () {

                p28fLoadMoreButton.style.display = "none";
                loadMorePosts(allPosts, elmnt, p28fLoadMoreButton);
            });

        } else {
            elmnt.innerHTML += "<p>Pas d'autres fiches disponibles</p>";
        }



    }).fail(function (error) {
        elmnt.innerHTML += '<p class="p28f-msg-error">Oups, un souci est survenue lors de la récupération des fiches :' + error + '</p>';
    });



}


/**
 * Gestion du filtrage de la durée d'un film
 */

function DureeAcf(selectedValue) {
    let dureeValues = [];
    let intervalStart;
    let intervalEnd;

    switch (selectedValue) {

        case '1':
            intervalStart = 1;
            intervalEnd = 61;
            break;

        case '2':
            intervalStart = 61;
            intervalEnd = 91;
            break;

        case '3':
            intervalStart = 91;
            intervalEnd = 121;
            break;

        case '4':
            intervalStart = 122;
            intervalEnd = 360;
            break;
    }

    do {

        dureeValues.push(intervalStart);
        intervalStart++;

    } while (intervalStart < intervalEnd);

    return dureeValues;
}

function loadMorePosts(posts, elementHTML, trigger) {
    posts.more().done(function (nextPosts) {


        nextPosts.forEach(nextPost => {

            elementHTML.innerHTML += `<div class="p28f-result-item" id="p28f-post-${nextPost.id}">
            <a href="${nextPost.link}" target="_blank" title="Découvrez ${nextPost.title.rendered}">
            <img class="p28f-thumbnail" alt="Affiche de l'oeuvre ${nextPost.title.rendered}" src="${nextPost._embedded['wp:featuredmedia'][0].source_url}" />
            </a>
            </div>`;
        });

        if (posts.hasMore()) {
            trigger.style.display = 'inline-block';
        } else {
            trigger.style.display = 'none';
            elementHTML.innerHTML += "<p>Pas d'autres fiches disponibles</p>";
        }
    }).fail(function (error) {
        console.error('Oups une erreur est survenue lors de la récupération des posts :', error);
    });

}