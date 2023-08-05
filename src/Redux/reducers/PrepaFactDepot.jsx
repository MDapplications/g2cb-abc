import { createReducer } from "@reduxjs/toolkit"
import {    addArticlePrepaFactDepot, 
            addBonPrepaFactDepot, 
            addPrepaFactDepot, 
            removeAllPrepaFactDepot, 
            removeBonPrepaFactDepot, 
            removePrepaFactDepot 
        } 
from "../actions/PrepaFactDepot"


//initial state
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


//helper add Bon
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


//helper remove Bon
const helperRemoveBon = (state, action) => {
    const bon = action.payload
    if (bon.user_id in state) {
        if (state[bon.user_id].bons.includes(bon.id)) {
            const oldBons = state[bon.user_id].bons
            const oldNbBons = state[bon.user_id].nbBons
            const oldMontant = state[bon.user_id].montant
            if (state[bon.user_id].bons.indexOf(bon.id) !== -1) {
                console.log(oldBons.filter(data => data.id !== bon.id))
                state[bon.user_id].bons = oldBons.filter(data => data !== bon.id)
                state[bon.user_id].nbBons = Number(oldNbBons) - 1
                state[bon.user_id].montant = Number(oldMontant) + Number(1 * bon.montant)
            }
        }
    }
    return state
}


//helper remove data
const removeDataById = (state, id) => delete state[id]



//reducer
export default createReducer(initialState, (builder) => {

    return builder
        .addCase(addPrepaFactDepot, (state, action) => {
            state = helperAddData(state, action)
            state = helperAddArticle(state, action)
            return state
        })
        .addCase(addArticlePrepaFactDepot, (state, action) => {
            return helperAddArticle(state, action)
        })
        .addCase(addBonPrepaFactDepot, (state, action) => {
            return helperAddBon(state, action)
        })
        .addCase(removeBonPrepaFactDepot, (state, action) => {
            return helperRemoveBon(state, action)
        })
        .addCase(removePrepaFactDepot, (state, action) => {
            return removeDataById(state, action.payload)
        })
        .addCase(removeAllPrepaFactDepot, () => {
            return initialState
        })
})
