import '../scss/style.scss';

/**
 * Fires the event
 */
const p28SearchForm = document.getElementById('p28f-searchForm');

if (p28SearchForm) {
    p28SearchForm.addEventListener('submit', onSearchFormChange, false);
}

function onSearchFormChange(e) {

    e.preventDefault();

    let selectElements = document.getElementsByClassName("p28f-select");
    const data = {};

    // Récupération des valeurs du formulaire
    for (let element of selectElements) {
        if (element.value !== 'Sélectionnez') {
            data[element.name] = element.value.trim();
        }
        if (element.name == 'format') {
            data['format-oeuvre'] = element.value.trim();
            delete data.format;
        }
    }

    console.log(data); // Vérifiez l'objet data avant la requête

    // Création de la collection et envoi de la requête
    const allPosts = new wp.api.collections.Oeuvres();

    allPosts.fetch({
        data: {
            ...data,
            per_page: 5,
            _embed: true
        }
    }).done(function (posts) {
        const elmnt = document.querySelector('div.p28f-results');
        elmnt.innerHTML = "";
        posts.forEach(post => {
            elmnt.innerHTML += post.title.rendered + '\n';
        });
    }).fail(function (error) {
        elmnt.innerHTML += 'Erreur lors de la récupération des données :' + error;
    });


}