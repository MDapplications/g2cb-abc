import {LOAD_ARTICLE_STANDBY,
        COMANDABLE_ARTICLE_STANDBY,
        CHANGE_CLUB_ARTICLE_STANDBY,
        DELETE_ARTICLE_STANDBY, 
        REMOVE_ARTICLE_STANDBY} from '../Constantes'

const {REACT_APP_USER_ID_CLUB} = process.env

//initial state
const initialState = {
    ArticlesStandby: []
}


//helper remove data
const removeDataById = (state, id) => {
    const Article = state.filter(Article => Article.id !== id)
    return Article
}


//helper de mise à jour de l'article (commandable)
const commandableDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.forCommande = action.value
        }
    })
    return state
}

//helper de mise à jour de l'article (article acheter par le club)
const changeClubDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.user_id = REACT_APP_USER_ID_CLUB
            article.user_name = action.value
        }
    })
    return state
}



//reducer
const reducerArticleStandby = (state=initialState.ArticlesStandby, action) => {

    if(localStorage.getItem('ArticlesStandby')) {
        state = JSON.parse(localStorage.getItem('ArticlesStandby'))
    }

    switch (action.type) {
        case LOAD_ARTICLE_STANDBY:
            return state

        case COMANDABLE_ARTICLE_STANDBY:
            state = commandableDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state

        case CHANGE_CLUB_ARTICLE_STANDBY:
            state = changeClubDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state

        case DELETE_ARTICLE_STANDBY:
            state = removeDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state

        case REMOVE_ARTICLE_STANDBY:
            state = removeDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerArticleStandby