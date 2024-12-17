import { button } from "../ui/button";
import { gridResult } from "../ui/gridResult";

/**
 *
 * Créer le résultat du post ID
 *
 * @param       {object}   posts        - Les posts renvoyés par l'API REST
 * @param {displayAreay}   HtmlElement  - Un noeud HTML dans lequel les résultats seront affichés
 * 
 * @returns {HtmlElement} 
 *
 * 
 */


export function loadMorePosts(posts, displayArea, p28EndMsgArea) {
    posts.more().done(function (nextPosts) {

        console.log(posts.hasMore());

        nextPosts.forEach(nextPost => {
            if (nextPost.taxonomy == 'realisation') {
                displayArea.innerHTML += gridResult(nextPost.id, nextPost.title.rendered, nextPost.link, nextPost.acf.affiche_url, 'realisation');

            } else {
                displayArea.innerHTML += gridResult(nextPost.id, nextPost.title.rendered, nextPost.link, nextPost.acf.affiche_url);

            }
        });


        if (posts.hasMore()) {
            p28EndMsgArea.innerHTML = button('Charger plus');

            let p28fLoadMoreButton = document.querySelector('button#p28f-load-more-btn');

            p28fLoadMoreButton.addEventListener('click', function () {

                p28fLoadMoreButton.style.display = "none";
                loadMorePosts(posts, displayArea, p28EndMsgArea);
            });
        } else {
            document.querySelector('button#p28f-load-more-btn').style.display = "none";
            p28EndMsgArea.innerHTML = '<p>Fin des posts.</p>';
        }

    }).fail(function (error) {

        p28ErrorArea.innerHTML = '<p>Une erreur est survenue :' + error + '</p>';
    });

}