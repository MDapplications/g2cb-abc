import {    LOAD_USERS, 
            ADD_USERS, 
            UPDATE_ROLE_USERS,
            DELETE_USERS,
            REMOVE_ALL_USERS} from '../Constantes'




const initialState = []


const helperAdddata = (action) => {
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
const reducerUtilisateurs = (state=initialState, action) => {

    if(localStorage.getItem('listUsers')) {
        state = JSON.parse(localStorage.getItem('listUsers'))
    }

    switch (action.type) {
        case LOAD_USERS:
            return state

        case ADD_USERS:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state

        case UPDATE_ROLE_USERS:
            state = updateRoleById(state, action)
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state

        case DELETE_USERS:
            state = deleteDataById(state, action.payload)
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state

        case REMOVE_ALL_USERS:
            state = []
            localStorage.setItem('listUsers', JSON.stringify(state))
            return state
            
        default: return state
    }
}


export default reducerUtilisateurs
