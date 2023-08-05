import { createReducer } from "@reduxjs/toolkit"
import { addParams, changeSelectYear, removeParams } from "../actions/Parametres"


//initial state
const initialState = {
    club: 'ABC',
    sendmail: '',
    minYear: 0,
    yearSelected: new Date().getFullYear()
}


//reducer
export default createReducer(initialState, (builder) => {
    return builder
        .addCase(removeParams, () => {
            return initialState
        })
        .addCase(addParams, (state, action) => {
            return {
                ...state,
                club: action.payload.club,
                sendmail: action.payload.sendmail,
                minYear: action.payload.minYear,
            }
        })
        .addCase(changeSelectYear, (state, action) => {
            return {
                ...state,
                yearSelected: action.payload,
            } 
        })
})


