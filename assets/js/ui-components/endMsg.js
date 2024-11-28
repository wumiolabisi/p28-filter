export function endMsg() {

    let endMsgContainer = document.createElement("div");
    endMsgContainer.id = "p28f-load-more-end-container";

    let msg = document.createElement("p");
    msg.id = "p28f-load-more-end-msg";
    msg.innerHTML = "Fin des posts.";

    return endMsgContainer.appendChild(msg);
}