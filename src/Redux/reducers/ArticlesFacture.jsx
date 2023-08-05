import { createReducer } from '@reduxjs/toolkit'
import {    addArticleFactureModif, 
            addBonFactureModif, 
            loadFactureModif, 
            removeArticleFactureModif, 
            removeFactureModif, 
            updateArticleFactureModif 
        } 
from '../actions/ArticlesFacture'


//initial state
const initialState = {
    id: '',
    date: '01/01/2022',
    montant: 0.0,
    nbArticles: 0,
    nbBons: 0,
    numFacture: '',
    regler: false,
    user_id: '',
    user_name: '',
    year: 2022,
    articles: [],
    bons: []
}

//récupération de la commande
const helperLoadData = facture => {
    return {
        id: facture.id,
        date: facture.date,
        montant: 0.0,
        nbArticles: facture.nb_articles,
        nbBons: facture.nb_bons,
        numFacture: facture.num_facture,
        user_id: facture.user_id,
        user_name: facture.user_name,
        year: facture.year,
        articles: [],
        bons: []
    }
}

//Ajout d'un bon
const helperAddBon = (state, bon) => {
    state.montant = state.montant - (bon.montant * 1)
    state.bons.push(bon)
    return state
}

//Ajout d'un article
const helperAddArticle = (state, article) => {
    state.montant = state.montant + (article.prix * article.quantite)
    state.articles.push(article)
    return state
}

//Ajout d'un article
const helperRemoveArticle = (state, article) => {
    state.nbArticles = Number(state.nbArticles - article.quantite)
    const resultMontant = Number(state.montant - (article.prix * article.quantite))
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
        .addCase(removeFactureModif, () => {
            return initialState
        })
        .addCase(loadFactureModif, (_, action) => {
            return helperLoadData(action.payload)
        })
        .addCase(addBonFactureModif, (state, action) => {
            return helperAddBon(state, action.payload)
        })
        .addCase(addArticleFactureModif, (state, action) => {
            return helperAddArticle(state, action.payload) 
        })
        .addCase(removeArticleFactureModif, (state, action) => {
            return helperRemoveArticle(state, action.payload)
        })
        .addCase(updateArticleFactureModif, (state, action) => {
            return helperUpdateArticle(state, action.payload)
        })
})