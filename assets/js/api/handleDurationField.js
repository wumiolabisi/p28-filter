/**
 *
 * Récupère les résultats possibles du champs acf "duree"
 *
 * @param {selectedValue}  id  - L'ID de l'option choisie par l'utilisateur
 * 
 * @returns {array} - Toutes les durées possibles - maximum 360 minutes.
 *
 * 
 */
export function handleDurationField(selectedValue) {


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