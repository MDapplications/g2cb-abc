import {ADD_PREPA_FACTURE,
        ADD_ARTICLE_PREPA_FACTURE,
        ADD_BON_PREPA_FACTURE,
        REMOVE_PREPA_FACTURE,
        REMOVE_ALL_PREPA_FACTURE} from '../Constantes'



const initialState = {}



const helperAddData = (state, action) => {
    return {...state,
        [action.payload.user_id]: {
            user_id: action.payload.user_id,
            user_name: action.payload.user_name,
            articles: [],
            numFacture: action.payload.facture,
            bons: [],
            nbArticles: 0,
            nbBons: 0,
            montant: 0.0
        }
    }
}


//helper add Article
const helperAddArticle = (state, action) => {
    const article = action.payload
    if (article.user_id in state) {
        if (!(state[article.user_id].articles.includes(article.id))) {
            const oldArticles = state[article.user_id].articles
            const oldNbArticles = state[article.user_id].nbArticles
            const oldMontant = state[article.user_id].montant
            state[article.user_id].articles = [...oldArticles, article.id]
            state[article.user_id].nbArticles = Number(oldNbArticles) + Number(article.quantite)
            state[article.user_id].montant = Number(oldMontant) + Number(article.quantite * article.prix)
        }
    }

    return state
}

//helper add Article
const helperAddBon = (state, action) => {
    const bon = action.payload
    if (bon.user_id in state) {
        if (!(state[bon.user_id].bons.includes(bon.id))) {
            const oldBons = state[bon.user_id].bons
            const oldNbBons = state[bon.user_id].nbBons
            const oldMontant = state[bon.user_id].montant
            state[bon.user_id].bons = [...oldBons, bon.id]
            state[bon.user_id].nbBons = Number(oldNbBons) + 1
            state[bon.user_id].montant = Number(oldMontant) - Number(1 * bon.montant)
        }
    }
    return state
}


//helper remove data
const removeDataById = (state, id) => delete state[id]




//reducer
const reducerPrepaFactures = (state=initialState, action) => {

    switch (action.type) {
        case ADD_PREPA_FACTURE:
            state = helperAddData(state, action)
            state = helperAddArticle(state, action)
            return state

        case ADD_ARTICLE_PREPA_FACTURE:
            state = helperAddArticle(state, action)
            return state

        case ADD_BON_PREPA_FACTURE:
            state = helperAddBon(state, action)
            return state

        case REMOVE_PREPA_FACTURE:
            state = removeDataById(state, action.payload)
            return state

        case REMOVE_ALL_PREPA_FACTURE:
            return initialState
            
        default: return state
    }
}

export default reducerPrepaFactures
