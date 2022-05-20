import {    LOAD_COMMANDE_MODIF,
            ADD_BON_COMMANDE_MODIF,
            ADD_ARTICLE_COMMANDE_MODIF,
            REMOVE_ARTICLE_COMMANDE_MODIF,
            UPDATE_ARTICLE_COMMANDE_MODIF,
            REMOVE_COMMANDE_MODIF } from '../Constantes'


//Action: chargement de la commande dans le reducer
export const loadCommandeModif = commande => {
    return {
        type: LOAD_COMMANDE_MODIF,
        payload: commande
    }
}

//Action: Ajout d'un bon dans la commande à modifier
export const addBonCommandeModif = bon => {
    return {
        type: ADD_BON_COMMANDE_MODIF,
        payload: bon
    }
}

//Action: Ajout d'un article dans la commande à modifier
export const addArticleCommandeModif = article => {
    return {
        type: ADD_ARTICLE_COMMANDE_MODIF,
        payload: article
    }
}


//Action: chargement de la commande dans le reducer
export const removeArticleCommandeModif = article => {
    return {
        type: REMOVE_ARTICLE_COMMANDE_MODIF,
        payload: article
    }
}

//Action: chargement de la commande dans le reducer
export const updateArticleCommandeModif = article => {
    return {
        type: UPDATE_ARTICLE_COMMANDE_MODIF,
        payload: article
    }
}

//Action: chargement de la commande dans le reducer
export const removeCommandeModif = () => {
    return {
        type: REMOVE_COMMANDE_MODIF
    }
}