import {LOAD_COMMANDE,
        ADD_COMMANDE,
        ADD_ARTICLE_COMMANDE,
        ADD_BON_COMMANDE,
        REMOVE_COMMANDE,
        REMOVE_ALL_COMMANDE} from '../Constantes'



//initial state
const initialState = {
    commandes: []
}


//helper add Data
const helperAdddata = action => {
    return {
        id: action.payload.id,
        date: action.payload.date,
        montant: action.payload.montant,
        nbArticles: action.payload.nb_articles,
        nbBons: action.payload.nb_bons,
        numCommande: action.payload.num_commande,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        year: action.payload.year,
        articles: [],
        bons: [],
    }
}


//helper remove data
const removeDataById = (state, id) => {
    const Commandes = state.filter(commande => commande.id !== id)
    return Commandes
}

//helper add Article
const helperAddArticle = (state, action) => {
    state.forEach((commande) => {
        if (commande.id === action.payload.commande) {
            commande.articles.push(action.payload)
        }
    })
    return state
}

//helper add Bon
const helperAddBon = (state, action) => {
    state.forEach(commande => {
        if (commande.id === action.payload.commande) {
            commande.bons.push(action.payload)
        }
    })
    return state
}



//reducer
const reducerCommandes = (state=initialState.commandes, action) => {

    if(localStorage.getItem('Commandes')) {
        state = JSON.parse(localStorage.getItem('Commandes'))
    }

    switch (action.type) {
        case LOAD_COMMANDE:
            return state

        case ADD_COMMANDE:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state

        case ADD_ARTICLE_COMMANDE:
            state = helperAddArticle(state, action)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state

        case ADD_BON_COMMANDE:
            state = helperAddBon(state, action)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state

        case REMOVE_COMMANDE:
            state = removeDataById(state, action.payload)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state

        case REMOVE_ALL_COMMANDE:
            state = []
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerCommandes