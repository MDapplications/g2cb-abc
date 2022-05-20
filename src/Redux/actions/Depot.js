import {LOAD_DEPOT,
        ADD_ARTICLE_DEPOT,
        FACTURABLE_ARTICLE_DEPOT,
        RETOURNABLE_ARTICLE_DEPOT,
        REMOVE_ARTICLE_DEPOT,
        REMOVE_ALL_DEPOT} from '../Constantes'



//Action: Chargement du dépot
export const loadDepot = () => {
    return {
        type: LOAD_DEPOT
    }
}

//Action: Ajout d'un article dans le dépot
export const addArticleDepot = data => {
    return {
        type: ADD_ARTICLE_DEPOT,
        payload: data
    }
}

//Action: Suppression d'un article du dépot
export const removeArticleDepot = id => {
    return {
        type: REMOVE_ARTICLE_DEPOT,
        payload: id
    }
}

//Action: Mettre un article pour facturation depuis le dépot
export const facturableArticleDepot = (id, value) => {
    return {
        type: FACTURABLE_ARTICLE_DEPOT,
        payload: {
            id,
            value
        }
    }
}

//Action: Mettre un article à retourner depuis le dépot
export const retournableArticleDepot = (id, value) => {
    return {
        type: RETOURNABLE_ARTICLE_DEPOT,
        payload: {
            id,
            value
        }
    }
}

//Action: Suppression de tout le contenu du dépot
export const removeAllDepot = () => {
    return {
        type: REMOVE_ALL_DEPOT
    }
}
