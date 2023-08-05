import { createReducer } from "@reduxjs/toolkit"
import { addUsers, deleteUsers, loadUsers, removeAllUsers, updateRoleUsers } from "../actions/Utilisateurs"




let initialState = []


const helperAddData = (action) => {
    return {
        email: action.payload.email,
        prenom: action.payload.prenom,
        nom: action.payload.nom,
        role: action.payload.role,
        id: action.payload.id
    }
}

const updateRoleById = (state, action) => {
    state.forEach((user) => {
        if (user.id === action.payload.id) {
            user.role = action.payload.role
        }
    })
    return state
}

const deleteDataById = (state, id) => {
    state.forEach((user) => {
        if (user.id === id) {
            user.role = 0
        }
    })
    return state
}



//reducer
export default createReducer(initialState, (builder) => {

    return builder 
        .addCase(loadUsers, () => {
            const localStorageData = localStorage.getItem('listUsers')
            return JSON.parse(localStorageData)
        })
        .addCase(removeAllUsers, () => {
            localStorage.setItem('listUsers', JSON.stringify([]))
            return []
        })
        .addCase(addUsers, (state, action) => {
            state = [...state, helperAddData(action)]
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state
        })
        .addCase(updateRoleUsers, (state, action) => {
            state = updateRoleById(state, action)
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state
        })
        .addCase(deleteUsers, (state, action) => {
            state = deleteDataById(state, action.payload)
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state
        })
})
