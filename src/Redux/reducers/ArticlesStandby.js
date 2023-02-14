import { createReducer } from "@reduxjs/toolkit"
import {    changeClubArticleStandby, 
            commandableArticleStandby, 
            loadArticleStandby, 
            removeArticleStandby 
        } 
from "../actions/ArticlesStandby"

const {REACT_APP_USER_ID_CLUB} = process.env

//initial state
let initialState = []


//helper remove data
const removeDataById = (state, id) => state.filter(Article => Article.id !== id)


//helper de mise à jour de l'article (commandable)
const commandableDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.forCommande = action.value
        }
    })
    return state
}


//helper de mise à jour de l'article (article acheter par le club)
const changeClubDataById = (state, action) => {
    state.forEach(article => {
        if (article.id === action.id) {
            article.user_id = REACT_APP_USER_ID_CLUB
            article.user_name = action.value
        }
    })
    return state
}


//reducer
export default createReducer(initialState, (builder) => {
    
    const localStorageData = localStorage.getItem('ArticlesStandby')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadArticleStandby, (state) => {
            return state
        })
        .addCase(changeClubArticleStandby, (state, action) => {
            state = changeClubDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state
        })
        .addCase(commandableArticleStandby, (state, action) => {
            state = commandableDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state
        })
        .addCase(removeArticleStandby, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('ArticlesStandby', JSON.stringify(state))
            return state
        })
})