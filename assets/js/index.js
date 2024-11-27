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
            per_page: 10,
            ...data,
            _embed: true
        }
    }).done(function (posts) {

        const elmnt = document.querySelector('div.p28f-results');
        elmnt.innerHTML = "";
        posts.forEach(post => {

            elmnt.innerHTML += `<div class="p28f-result-item" id="p28f-post-${post.id}">
            <a href="${post.link}" target="_blank" title="Découvrez ${post.title.rendered}">
            <img class="p28f-thumbnail" alt="Affiche de l'oeuvre ${post.title.rendered}" src="${post._embedded['wp:featuredmedia'][0].source_url}" />
            </a>
            </div>`;
        });
    }).fail(function (error) {
        elmnt.innerHTML += '<p class="p28f-msg-error">Oups, un souci est survenue lors de la récupération des fiches :' + error + '</p>';
    });

    console.log(allPosts.hasMore());


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