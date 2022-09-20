import {LOAD_FACTURE,
        ADD_FACTURE,
        ADD_ARTICLE_FACTURE,
        ADD_BON_FACTURE,
        REGLER_FACTURE,
        REMOVE_FACTURE,
        REMOVE_ALL_FACTURE} from '../Constantes'



//initial state
const initialState = {
    factures: []
}




//helper add Data
const helperAdddata = action => {
    return {
        id: action.payload.id,
        date: action.payload.date,
        montant: action.payload.montant,
        nbArticles: action.payload.nb_articles,
        nbBons: action.payload.nb_bons,
        numFacture: action.payload.num_facture,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        year: action.payload.year,
        regler: action.payload.regler,
        articles: [],
        bons: [],
    }
}


//helper remove data
const removeDataById = (state, id) => {
    const Factures = state.filter(facture => facture.id !== id)
    return Factures
}


const reglerDataById = (state, action) => {
    state.forEach((facture) => {
        if (facture.id === action.payload.id) {
            facture.regler = action.payload.value
        }
    })
    return state
}


//helper add Article
const helperAddArticle = (state, action) => {
    state.forEach((facture) => {
        if (facture.id === action.payload.facture) {
            facture.articles.push(action.payload)
        }
    })
    return state
}

//helper add Bon
const helperAddBon = (state, action) => {
    state.forEach(facture => {
        if (facture.id === action.payload.facture) {
            facture.bons.push(action.payload)
        }
    })
    return state
}





//reducer
const reducerFactures = (state=initialState.factures, action) => {

    if(localStorage.getItem('Factures')) {
        state = JSON.parse(localStorage.getItem('Factures'))
    }

    switch (action.type) {
        case LOAD_FACTURE:
            return state

        case ADD_FACTURE:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('Factures', JSON.stringify(state))
            return state

        case ADD_ARTICLE_FACTURE:
            state = helperAddArticle(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state

        case ADD_BON_FACTURE:
            state = helperAddBon(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state

        case REGLER_FACTURE:
            state = reglerDataById(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state

        case REMOVE_FACTURE:
            state = removeDataById(state, action.payload)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state

        case REMOVE_ALL_FACTURE:
            state = []
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerFactures