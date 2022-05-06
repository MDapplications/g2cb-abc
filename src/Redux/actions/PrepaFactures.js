import {ADD_PREPA_FACTURE,
        ADD_ARTICLE_PREPA_FACTURE,
        ADD_BON_PREPA_FACTURE,
        REMOVE_PREPA_FACTURE,
        REMOVE_ALL_PREPA_FACTURE} from '../Constantes'


//Action: Ajout d'une Facture
export const addPrepaFacture = (data) => {
    return {
        type: ADD_PREPA_FACTURE,
        payload: data
    }
}


//Action: Ajout d'un article dans une prepa facture
export const addArticlePrepaFacture = article => {
    return {
        type: ADD_ARTICLE_PREPA_FACTURE,
        payload: article
    }
}


//Action: Ajout d'un article dans une prepa facture
export const addBonPrepaFacture = bon => {
    return {
        type: ADD_BON_PREPA_FACTURE,
        payload: bon
    }
}


//Action: Ajout d'un article dans une prepa facture
export const removePrepaFacture = id => {
    return {
        type: REMOVE_PREPA_FACTURE,
        payload: id
    }
}


//Action: Ajout d'un article dans une prepa facture
export const removeAllPrepaFacture = () => {
    return {
        type: REMOVE_ALL_PREPA_FACTURE
    }
}