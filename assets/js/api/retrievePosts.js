import { button } from '../ui/button';
import { handleDurationField } from '../api/handleDurationField';
import { loadMorePosts } from '../api/handleLoadMore';
import { gridResult } from '../ui/gridResult';

export function retrievePosts(e, countZone, endZone, resultsZone, errorZone) {

    e.preventDefault();

    let selectElements = document.getElementsByClassName("p28f-select");
    const data = {};

    // Récupération des valeurs du formulaire
    for (let element of selectElements) {


        if (element.value !== 'Sélectionnez') {
            data[element.name] = element.value;

            if (element.name == "duree") {
                data['duree'] = handleDurationField(element.value);
            }
        }



    }

    if (document.querySelector("input#p28f-taxonomy") && document.querySelector("input#p28f-taxonomy-term-id")) {

        const p28fTaxonomy = document.getElementById("p28f-taxonomy").value;
        const p28fTaxonomyTerm = document.getElementById("p28f-taxonomy-term-id").value;
        data[p28fTaxonomy] = p28fTaxonomyTerm;
    }

    console.log(data);

    // Création de la collection et envoi de la requête
    const allPosts = new wp.api.collections.Oeuvres();

    allPosts.fetch({
        data: {
            per_page: 8,
            ...data,
            _embed: true
        }

    }).then(
        resultsZone.innerHTML = '<p class="p28f-loading">Chargement ...</p>',
        endZone.innerHTML = ""
    ).done(function (posts) {


        resultsZone.innerHTML = "";

        if (allPosts.state.totalObjects === 0) {
            countZone.innerHTML = "";

            endZone.innerHTML = "<p>Il n'y a pas de posts correspondant à votre recherche.</p>";

        } else {
            countZone.innerHTML = "<p>" + allPosts.state.totalObjects + " fiches trouvées</p>";
            posts.forEach(post => {

                resultsZone.innerHTML += gridResult(post.id, post.title.rendered, post.link, post.acf.affiche_url);

            });


            /**
        * Load More
        */
            if (allPosts.hasMore()) {
                endZone.innerHTML = button('Charger plus');


                let p28fLoadMoreButton = document.querySelector('button#p28f-load-more-btn');

                p28fLoadMoreButton.addEventListener('click', function () {

                    p28fLoadMoreButton.style.display = "none";
                    loadMorePosts(allPosts, resultsZone, endZone);
                });

            } else {

                endZone.innerHTML = '<p>Fin des posts.</p>';
            }
        }





    }).fail(function (error) {
        errorZone.innerHTML = '<p>Une erreur est survenue :' + error + '</p>';
    });



}