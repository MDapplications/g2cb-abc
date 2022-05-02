import {LOAD_ARTICLE_STANDBY, 
        COMANDABLE_ARTICLE_STANDBY,
        CHANGE_CLUB_ARTICLE_STANDBY,
        DELETE_ARTICLE_STANDBY, 
        REMOVE_ARTICLE_STANDBY} from '../Constantes'


//Action: chargement des articles en attente
export const loadArticleStandby = () => {
    return {
        type: LOAD_ARTICLE_STANDBY
    }
}

//Action: chargement des articles en attente
export const changeClubArticleStandby = (id, value) => {
    return {
        type: CHANGE_CLUB_ARTICLE_STANDBY,
        payload: {
            id,
            value
        }
    }
}

//Action: Suppression d'un article
export const commandableArticleStandby = (id, value) => {
    return {
        type: COMANDABLE_ARTICLE_STANDBY,
        payload: {
            id,
            value
        }
    }
}

//Action: Suppression d'un article
export const deleteArticleStandby = id => {
    return {
        type: DELETE_ARTICLE_STANDBY,
        payload: id
    }
}

//Action: L'article n'est plus en standby
export const removeArticleStandby = id => {
    return {
        type: REMOVE_ARTICLE_STANDBY,
        payload: id
    }
}

