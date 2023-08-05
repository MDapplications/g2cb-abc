import { createReducer } from '@reduxjs/toolkit'
import { commandableBonStandby, loadBonStandby, removeBonStandby } from '../actions/BonsStandby'



//initial state
let initialState = []


//helper remove data
const removeDataById = (state, id) => state.filter(bon => bon.id !== id)


//helper de mise à jour de l'BON (commandable)
const commandableDataById = (state, action) => {
    state.forEach(bon => {
        if (bon.id === action.id) {
            bon.forCommande = action.value
        }
    })
    return state
}


//reducer
export default createReducer(initialState, (builder) => {
    return builder
        .addCase(loadBonStandby, () => {
            const localStorageData = localStorage.getItem('BonsStandby')
            return JSON.parse(localStorageData)
        })
        .addCase(commandableBonStandby, (state, action) => {
            state = commandableDataById(state, action.payload)
            localStorage.setItem('BonsStandby', JSON.stringify(state))
            return state
        })
        .addCase(removeBonStandby, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsStandby', JSON.stringify(state))
            return state
        })

})