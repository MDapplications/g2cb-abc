import { createReducer } from "@reduxjs/toolkit"
import { addArticleCommande, addBonCommande, addCommande, loadCommande, removeAllCommande, removeCommande } from "../actions/Commandes"


//initial state
let initialState = []


//helper add Data
const helperAddData = action => {
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
const removeDataById = (state, id) => state.filter(commande => commande.id !== id)


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
export default createReducer(initialState, (builder) => {

    const localStorageData = localStorage.getItem('Commandes')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadCommande, (state) => {
            return state
        })
        .addCase(removeAllCommande, () => {
            localStorage.setItem('Commandes', JSON.stringify([]))
            return []
        })
        .addCase(addCommande, (state, action) => {
            state = [...state, helperAddData(action)]
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state
        })
        .addCase(removeCommande, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state
        })
        .addCase(addArticleCommande, (state, action) => {
            state = helperAddArticle(state, action)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state
        })
        .addCase(addBonCommande, (state, action) => {
            state = helperAddBon(state, action)
            localStorage.setItem('Commandes', JSON.stringify(state))
            return state
        })

})