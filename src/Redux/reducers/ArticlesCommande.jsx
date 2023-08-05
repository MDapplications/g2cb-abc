import { createReducer } from '@reduxjs/toolkit'
import {    loadCommandeModif, 
            addBonCommandeModif, 
            addArticleCommandeModif, 
            removeArticleCommandeModif, 
            updateArticleCommandeModif,
            removeCommandeModif
        }  
from "../actions/ArticlesCommande"


//initial state
const initialState = {
    id: '',
    date: '01/01/2022',
    montant: 0,
    nbArticles: 0,
    nbBons: 0,
    numCommande: '',
    user_id: '',
    user_name: '',
    year: 2022,
    articles: [],
    bons: []
}

//récupération de la commande
const helperLoadData = commande => {
    return {
        id: commande.id,
        date: commande.date,
        montant: 0,
        nbArticles: 0,
        nbBons: 0,
        numCommande: commande.numCommande,
        user_id: commande.user_id,
        user_name: commande.user_name,
        year: commande.year,
        articles: [],
        bons: []
    }
}

//Ajout d'un bon
const helperAddBon = (state, bon) => {
    state.nbBons = state.nbBons + 1
    state.montant = state.montant - (bon.montant * 1)
    state.bons.push(bon)
    return state
}

//Ajout d'un article
const helperAddArticle = (state, article) => {
    state.nbArticles = state.nbArticles + article.quantite
    state.montant = state.montant + (article.prix * article.quantite)
    state.articles.push(article)
    return state
}

//Ajout d'un article
const helperRemoveArticle = (state, article) => {
    state.nbArticles = state.nbArticles - article.quantite
    const resultMontant = state.montant - (article.prix * article.quantite)
    if (resultMontant >= 0) {
        state.montant = resultMontant
    } else {
        state.montant = 0
    }
    state.articles = state.articles.filter(data => data.id !== article.id)
    return state
}

//mise à jour d'un article
const helperUpdateArticle = (state, article) => {
    const prevArticle = state.articles.find(data => data.id === article.id)
    state.articles = state.articles.filter(data => data.id !== article.id)
    
    //changement du prix
    if (prevArticle.prix !== article.prix) {
        const resultMontant = state.montant + (article.prix * article.quantite) - (prevArticle.prix * prevArticle.quantite) 
        if (resultMontant >= 0) {
            state.montant = resultMontant
        } else {
            state.montant = 0
        }
    } 

    state.articles.push(article)
    return state
}


//reducer
export default createReducer(initialState, (builder) => {
    return builder
        .addCase(removeCommandeModif, () => {
            return initialState
        })
        .addCase(loadCommandeModif, (_, action) => {
            return helperLoadData(action.payload)
        })
        .addCase(addBonCommandeModif, (state, action) => {
            return helperAddBon(state, action.payload)
        })
        .addCase(addArticleCommandeModif, (state, action) => {
            return helperAddArticle(state, action.payload) 
        })
        .addCase(removeArticleCommandeModif, (state, action) => {
            return helperRemoveArticle(state, action.payload)
        })
        .addCase(updateArticleCommandeModif, (state, action) => {
            return helperUpdateArticle(state, action.payload)
        })
})