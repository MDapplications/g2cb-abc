import { ADD_ARTICLE_MEMBRE, REMOVE_ARTICLE_MEMBRE, REMOVE_ALL_ARTICLE_MEMBRE } from '../Constantes'


export const addArticleMembre = data => {
    return {
        type: ADD_ARTICLE_MEMBRE,
        payload: data  // object: articleMembre
    }
}

export const removeArticleMembre = id => {
    return {
        type: REMOVE_ARTICLE_MEMBRE,
        payload: id
    }
}


export const removeAllArticleMembre = () => {
    return {
        type: REMOVE_ALL_ARTICLE_MEMBRE
    }
}