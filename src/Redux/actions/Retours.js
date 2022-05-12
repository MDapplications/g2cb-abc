import {LOAD_RETOUR,
        ADD_RETOUR,
        ADD_ARTICLE_RETOUR,
        RETOURNER_RETOUR,
        REMOVE_RETOUR,
        REMOVE_ALL_RETOUR} from '../Constantes'



//Action: Chargement des Retours
export const loadRetour = () => {
    return {
        type: LOAD_RETOUR
    }
}

//Action: Ajout d'un Retour
export const addRetour = data => {
    return {
        type: ADD_RETOUR,
        payload: data
    }
}

//Action: Ajout d'une Facture
export const addArticleRetour = article => {
    return {
        type: ADD_ARTICLE_RETOUR,
        payload: article
    }
}

//Action: 
export const retournerRetour = (id, value) => {
    return {
        type: RETOURNER_RETOUR,
        payload: {
            id,
            value
        }
    }
}


//Action: Suppression d'une Facture
export const removeRetour = id => {
    return {
        type: REMOVE_RETOUR,
        payload: id
    }
}

//Action: Suppression d'une Facture
export const removeAllRetour = id => {
    return {
        type: REMOVE_ALL_RETOUR
    }
}