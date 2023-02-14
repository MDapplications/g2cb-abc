import { createReducer } from "@reduxjs/toolkit"
import {    addArticleFacture, 
            addBonFacture, 
            addFacture, 
            loadFacture, 
            reglerFacture, 
            removeAllFacture, 
            removeFacture 
        } 
from "../actions/Factures"


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
const removeDataById = (state, id) => state.filter(facture => facture.id !== id)


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
export default createReducer(initialState, (builder) => {

    const localStorageData = localStorage.getItem('BonsDepot')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadFacture, (state) => {
            return state
        })
        .addCase(removeAllFacture, () => {
            localStorage.setItem('Factures', JSON.stringify([]))
            return []
        })
        .addCase(addFacture, (state, action) => {
            state = [...state, helperAddData(action)]
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
        })
        .addCase(addArticleFacture, (state, action) => {
            state = helperAddArticle(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
        })
        .addCase(addBonFacture, (state, action) => {
            state = helperAddBon(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
        })
        .addCase(reglerFacture, (state, action) => {
            state = reglerDataById(state, action)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
        })
        .addCase(removeFacture, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('Factures', JSON.stringify(state))
            return state
        })

})