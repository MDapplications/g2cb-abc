import {LOAD_DEPOT,
        ADD_ARTICLE_DEPOT,
        FACTURABLE_ARTICLE_DEPOT,
        RETOURNABLE_ARTICLE_DEPOT,
        REMOVE_ARTICLE_DEPOT,
        REMOVE_ALL_DEPOT} from '../Constantes'





const initialState = {
    depot: []
}



const helperAddArticle = (state, article) => {
    state = [...state, article]
    return state
}


//helper de mise à jour de l'article (commandable)
const facturableDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.forFacture = action.value
        }
    })
    return state
}

//helper de mise à jour de l'article (commandable)
const retournableDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.forRetour = action.value
        }
    })
    return state
}


const removeDataById = (state, id) => {
    const depot = state.filter(Article => Article.id !== id)
    return depot
}



//reducer
const reducerDepot = (state=initialState.depot, action) => {

    if(localStorage.getItem('Depot')) {
        state = JSON.parse(localStorage.getItem('Depot'))
    }

    switch (action.type) {
        case LOAD_DEPOT:
            return state

        case ADD_ARTICLE_DEPOT:
            state = helperAddArticle(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
            
        case FACTURABLE_ARTICLE_DEPOT:
            state = facturableDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state

        case RETOURNABLE_ARTICLE_DEPOT:
            state = retournableDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state

        case REMOVE_ARTICLE_DEPOT:
            state = removeDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state

        case REMOVE_ALL_DEPOT:
            state = []
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerDepot