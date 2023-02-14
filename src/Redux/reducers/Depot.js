import { createReducer } from '@reduxjs/toolkit'
import {    addArticleDepot, 
            facturableArticleDepot, 
            loadDepot, 
            removeAllDepot, 
            removeArticleDepot, 
            retournableArticleDepot 
        } 
from '../actions/Depot'


let initialState = []


const helperAddArticle = (state, article) => [...state, article]


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


const removeDataById = (state, id) => state.filter(Article => Article.id !== id)


//reducer
export default createReducer(initialState, (builder) => {
    
    const localStorageData = localStorage.getItem('Commandes')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadDepot, (state) => {
            return state
        })
        .addCase(removeAllDepot, () => {
            localStorage.setItem('Depot', JSON.stringify([]))
            return []
        })
        .addCase(addArticleDepot, (state, action) => {
            state = helperAddArticle(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
        })
        .addCase(removeArticleDepot, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
        })
        .addCase(retournableArticleDepot, (state, action) => {
            state = retournableDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
        })
        .addCase(facturableArticleDepot, (state, action) => {
            state = facturableDataById(state, action.payload)
            localStorage.setItem('Depot', JSON.stringify(state))
            return state
        })

})