import { createReducer } from "@reduxjs/toolkit"
import {    addBonDepot, 
            facturableBonDepot, 
            loadBonDepot, 
            removeAllBonDepot, 
            removeBonDepot 
        } 
from "../actions/BonsDepot"


//initial state
let initialState = []


//helper d'ajout de bon pour dépot 
const helperAddBon = (state, bon) => [...state, bon]


//helper de mise à jour de l'article (facturable)
const facturableDataById = (state, action) => {
    state.forEach(bon => {
        if (bon.id === action.id) {
            bon.forFacture = action.value
        }
    })
    return state
}


//helper de suppression de bon pour depot
const removeDataById = (state, id) => state.filter(bon => bon.id !== id)


//reducer
export default createReducer(initialState, (builder) => {
        
    const localStorageData = localStorage.getItem('BonsDepot')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(loadBonDepot, (state) => {
            return state
        })
        .addCase(removeAllBonDepot, () => {
            localStorage.setItem('BonsDepot', JSON.stringify([]))
            return []
        })
        .addCase(addBonDepot, (state, action) => {
            state = helperAddBon(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state
        })
        .addCase(removeBonDepot, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state
        })
        .addCase(facturableBonDepot, (state, action) => {
            state = facturableDataById(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state
        })

})