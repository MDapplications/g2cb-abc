import { createReducer } from '@reduxjs/toolkit'
import { v4 as uuiv4} from 'uuid'
import {    addArticleMembre, 
            removeArticleMembre, 
            removeAllArticleMembre
        } 
from '../actions/ArticlesMembre'


//initial state
let initialState = [] 

//helper add Data
const helperAdddata = action => {
    return {
        id: uuiv4(),
        reference: action.payload.reference,
        prix: Number(action.payload.prix),
        quantite: Number(action.payload.quantite),
        variante: action.payload.variante,
        description: action.payload.description,
        destination: action.payload.destination,
        date: action.payload.date,
    }
}

//helper remove data
const removeDataById = (state, id) => state.filter(Article => Article.id !== id)


//reducer
export default createReducer(initialState, (builder) => {

    const localStorageData = localStorage.getItem('ArticlesMembre')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(addArticleMembre, (state, action) => {
            state = [...state, helperAdddata(action)]
            localStorage.setItem('ArticlesMembre', JSON.stringify(state))
            return state
        })
        .addCase(removeArticleMembre, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('ArticlesMembre', JSON.stringify(state))
            return state
        })
        .addCase(removeAllArticleMembre, () => {
            localStorage.setItem('ArticlesMembre', JSON.stringify([]))
            return []
        })

})