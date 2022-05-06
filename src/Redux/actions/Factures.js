import {LOAD_FACTURE,
        ADD_FACTURE,  
        ADD_ARTICLE_FACTURE,
        ADD_BON_FACTURE,
        REGLER_FACTURE,
        REMOVE_FACTURE,
        REMOVE_ALL_FACTURE} from '../Constantes'


//Action: Chargement des Factures
export const loadFacture = () => {
    return {
        type: LOAD_FACTURE
    }
}

//Action: Ajout d'une Facture
export const addFacture = data => {
    return {
        type: ADD_FACTURE,
        payload: data
    }
}

//Action: Ajout d'une Facture
export const addArticleFacture = article => {
    return {
        type: ADD_ARTICLE_FACTURE,
        payload: article
    }
}

//Action: Ajout d'une FACTURE
export const addBonFacture = bon => {
    return {
        type: ADD_BON_FACTURE,
        payload: bon
    }
}


export const reglerFacture = (id, value) => {
    return {
        type: REGLER_FACTURE,
        payload: {
            id,
            value
        }
    }
}


//Action: Suppression d'une Facture
export const removeFacture = id => {
    return {
        type: REMOVE_FACTURE,
        payload: id
    }
}

//Action: Suppression d'une Facture
export const removeAllFacture = id => {
    return {
        type: REMOVE_ALL_FACTURE
    }
}