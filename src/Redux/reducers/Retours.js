import { createReducer } from "@reduxjs/toolkit"
import {    addArticleRetour, 
            addRetour, 
            loadRetour, 
            removeAllRetour, 
            removeRetour, 
            retournerRetour 
        } 
from "../actions/Retours"


let initialState = []


//helper add Data
const helperAddData = action => {
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
export default createReducer(initialState, (builder) => {

    const localStorageData = localStorage.getItem('Retours')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadRetour, (state) => {
            return state
        })
        .addCase(removeAllRetour, () => {
            localStorage.setItem('Retours', JSON.stringify([]))
            return []
        })
        .addCase(addRetour, (state, action) => {
            state = [...state, helperAddData(action)]
            localStorage.setItem('Retours', JSON.stringify(state))
            return state
        })
        .addCase(removeRetour, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state
        })
        .addCase(addArticleRetour, (state, action) => {
            state = helperAddArticle(state, action)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state
        })
        .addCase(retournerRetour, (state, action) => {
            state = retournerDataById(state, action)
            localStorage.setItem('Retours', JSON.stringify(state))
            return state
        })

})