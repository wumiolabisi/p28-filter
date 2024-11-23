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

    for (let element of selectElements) {
        if (element.value == 'Sélectionnez') {
            data[element.name] = undefined;
        } else {
            data[element.name] = element.value;
        }

    }

    console.log(data);

}