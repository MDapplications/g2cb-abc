import { createReducer } from "@reduxjs/toolkit"
import { addUser, removeUser, updateUser } from "../actions/Users"


//initial state
const initialState = {
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    code_postal: '',
    ville: '',
    role: 0
}

//reducer
export default createReducer(initialState, (builder) => {
    return builder
        .addCase(removeUser, () => {
            return initialState
        })
        .addCase(addUser, (state, action) => {
            const {prenom, nom, email, adresse, code_postal, ville, role} = action.payload
            return {...state, prenom, nom, email, adresse, code_postal, ville, role }
        })
        .addCase(updateUser, (state, action) => {
            const {adresse, code_postal, ville} = action.payload
            return {...state, adresse, code_postal, ville }
        })
})