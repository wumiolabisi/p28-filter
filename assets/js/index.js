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
            data[element.name] = element.value.trim();
            if (element.name == 'format') {
                data['format-oeuvre'] = element.value.trim();
                delete data.format;
            }
        }

    }

    //console.log(data); // Vérifiez l'objet data avant la requête

    // Création de la collection et envoi de la requête
    const allPosts = new wp.api.collections.Oeuvres();

    allPosts.fetch({
        data: {
            per_page: 25,
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