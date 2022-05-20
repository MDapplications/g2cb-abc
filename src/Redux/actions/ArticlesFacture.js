import {    LOAD_FACTURE_MODIF,
            ADD_BON_FACTURE_MODIF,
            ADD_ARTICLE_FACTURE_MODIF,
            REMOVE_ARTICLE_FACTURE_MODIF,
            UPDATE_ARTICLE_FACTURE_MODIF,
            REMOVE_FACTURE_MODIF } from '../Constantes'


//Action: chargement de la facture dans le reducer
export const loadFactureModif = facture => {
    return {
        type: LOAD_FACTURE_MODIF,
        payload: facture
    }
}

//Action: Ajout d'un bon dans la facture à modifier
export const addBonFactureModif = bon => {
    return {
        type: ADD_BON_FACTURE_MODIF,
        payload: bon
    }
}

//Action: Ajout d'un article dans la facture à modifier
export const addArticleFactureModif = article => {
    return {
        type: ADD_ARTICLE_FACTURE_MODIF,
        payload: article
    }
}


//Action: chargement de la facture dans le reducer
export const removeArticleFactureModif = article => {
    return {
        type: REMOVE_ARTICLE_FACTURE_MODIF,
        payload: article
    }
}

//Action: chargement de la facture dans le reducer
export const updateArticleFactureModif = article => {
    return {
        type: UPDATE_ARTICLE_FACTURE_MODIF,
        payload: article
    }
}

//Action: chargement de la facture dans le reducer
export const removeFactureModif = () => {
    return {
        type: REMOVE_FACTURE_MODIF
    }
}