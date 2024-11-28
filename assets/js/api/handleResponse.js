import { button } from "../ui-components/button";
import { errorMsg } from "../ui-components/errorMsg";
import { gridResult } from "../ui-components/gridResult";

/**
 *
 * Créer le résultat du post ID
 *
 * @param {selectedValue}  id  - L'ID de l'option choisie par l'utilisateur
 * 
 * @returns {array} - Toutes les durées possibles - maximum 360 minutes.
 *
 * 
 */
export function handleResponse(posts, displayArea) {

    posts.forEach(post => {
        displayArea.innerHTML += gridResult(post.id, post.title.rendered, post.link, post._embedded['wp:featuredmedia'][0].source_url);
    });


}

export function handleLoadMore(posts, displayArea) {

    if (posts.hasMore()) {
        displayArea.after(button('Charger plus'));
    } else {
        document.querySelector('button#p28f-load-more').style.display = "none";
        displayArea.after(endMsg());
    }
}

export function loadMorePosts(posts, displayArea) {
    posts.more().done(function (nextPosts) {

        handleResponse(nextPosts, displayArea);
        handleLoadMore(nextPosts, displayArea);

    }).fail(function (error) {
        displayArea.after(errorMsg(error));
    });

}