import {LOAD_COMMANDE,
        ADD_COMMANDE,  
        ADD_ARTICLE_COMMANDE,
        ADD_BON_COMMANDE,
        REMOVE_COMMANDE} from '../Constantes'


//Action: Chargement des commandes
export const loadCommande = () => {
    return {
        type: LOAD_COMMANDE
    }
}

//Action: Ajout d'une commande
export const addCommande = data => {
    return {
        type: ADD_COMMANDE,
        payload: data
    }
}

//Action: Ajout d'une commande
export const addArticleCommande = article => {
    return {
        type: ADD_ARTICLE_COMMANDE,
        payload: article
    }
}

//Action: Ajout d'une commande
export const addBonCommande = bon => {
    return {
        type: ADD_BON_COMMANDE,
        payload: bon
    }
}

//Action: Suppression d'une commande
export const removeCommande = id => {
    return {
        type: REMOVE_COMMANDE,
        payload: id
    }
}