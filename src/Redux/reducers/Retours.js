import {LOAD_RETOUR,
        ADD_RETOUR,
        ADD_ARTICLE_RETOUR,
        RETOURNER_RETOUR,
        REMOVE_RETOUR,
        REMOVE_ALL_RETOUR} from '../Constantes'



const initialState = []


//helper add Data
const helperAdddata = action => {
    return {
        id: action.payload.id,
        date: action.payload.date,
        montant: action.payload.montant,
        nbArticles: action.payload.nb_articles,
        numRetour: action.payload.num_retour,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        year: action.payload.year,
        retourner: action.payload.retourner,
        articles: [],
    }
}


//helper remove data
const removeDataById = (state, id) => {
    return state.filter(retour => retour.id !== id)
}


const retournerDataById = (state, action) => {
    state.forEach((retour) => {
        if (retour.id === action.payload.id) {
            retour.retourner = action.payload.value
        }
    })
    return state
}


//helper add Article
const helperAddArticle = (state, action) => {
    state.forEach((retour) => {
        if (retour.id === action.payload.retour) {
            retour.articles.push(action.payload)
        }
    })
    return state
}




//reducer
const reducerRetours = (state=initialState, action) => {

    if(localStorage.getItem('Retours')) {
        state = JSON.parse(localStorage.getItem('Retours'))
    }

    switch (action.type) {
        case LOAD_RETOUR:
            return state

        case ADD_RETOUR:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('Retours', JSON.stringify(state))
            return state

        case ADD_ARTICLE_RETOUR:
            state = helperAddArticle(state, action)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state

        case RETOURNER_RETOUR:
            state = retournerDataById(state, action)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state

        case REMOVE_RETOUR:
            state = removeDataById(state, action.payload)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state

        case REMOVE_ALL_RETOUR:
            state = []
            localStorage.setItem('Retours', JSON.stringify(state))
            return state
            
        default: return state
    }
}


export default reducerRetours