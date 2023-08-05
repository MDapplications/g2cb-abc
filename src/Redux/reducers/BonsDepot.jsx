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

    return builder
        .addCase(loadBonDepot, () => {
            const localStorageData = localStorage.getItem('BonsDepot')
            return JSON.parse(localStorageData)
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