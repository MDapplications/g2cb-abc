import { createReducer } from "@reduxjs/toolkit"
import {    addCompteurCommande, 
            addCompteurFacture, 
            addCompteurRetour, 
            initCompteurs 
        } 
from "../actions/Compteurs"


//initial state
let initialState = {
    commande: 1,
    facture: 1,
    retour: 1
}


//reducer
export default createReducer(initialState, (builder) => {

    const localStorageData = localStorage.getItem('Compteurs')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }

    return builder
        .addCase(initCompteurs, () => {
            localStorage.setItem('Compteurs', JSON.stringify(initialState))
            return initialState
        })
        .addCase(addCompteurCommande, (state) => {
            state.commande = state.commande + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state
        })
        .addCase(addCompteurFacture, (state) => {
            state.facture = state.facture + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state
        })
        .addCase(addCompteurRetour, (state) => {
            state.retour = state.retour + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state
        })
})
