import { createReducer } from '@reduxjs/toolkit'
import { addBonMembre, removeAllBonMembre, removeBonMembre } from '../actions/BonsMembre'
import { v4 as uuiv4} from 'uuid'


//initial state
let initialState = []


//helper add Data
const helperAdddata = action => {
    return {
        id: uuiv4(),
        reference: action.payload.reference,
        montant: Number(action.payload.montant),
        date: action.payload.date,
    }
}


//helper remove data
const removeDataById = (state, id) => state.filter(Bon => Bon.id !== id)


//reducer
export default createReducer(initialState, (builder) => {
    const localStorageData = localStorage.getItem('BonsMembre')
    if (localStorageData) {
        initialState = JSON.parse(localStorageData)
    }
    
    return builder
        .addCase(removeAllBonMembre, () => {
            localStorage.setItem('BonsMembre', JSON.stringify([]))
            return []
        })
        .addCase(addBonMembre, (state, action) => {
            state = [...state, helperAdddata(action)]
            localStorage.setItem('BonsMembre', JSON.stringify(state))
            return state
        })
        .addCase(removeBonMembre, (state, action) => {
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsMembre', JSON.stringify(state))
            return state
        })
})