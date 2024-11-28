import { button } from "../ui-components/button";
import { gridResult } from "../ui-components/gridResult";

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

        nextPosts.forEach(nextPost => {
            displayArea.innerHTML += gridResult(nextPost.id, nextPost.title.rendered, nextPost.link, nextPost._embedded['wp:featuredmedia'][0].source_url);
        });


        if (posts.hasMore.length != 0) {
            p28EndMsgArea.innerHTML = button('Charger plus');
        } else {
            document.querySelector('button#p28f-load-more-btn').style.display = "none";
            p28EndMsgArea.innerHTML = '<p>Fin des posts.</p>';
        }

    }).fail(function (error) {
        p28ErrorArea.innerHTML = '<p>Une erreur est survenue :' + error + '</p>';
    });

}