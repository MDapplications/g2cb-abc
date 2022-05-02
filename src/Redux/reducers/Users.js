import { ADD_USER, REMOVE_USER } from '../Constantes'


//initial state
const initialState = {
    prenom: '',
    nom: '',
    email: '',
    role: 0
}


//reducer
const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                prenom: action.payload.prenom,
                nom: action.payload.nom,
                email: action.payload.email,
                role: action.payload.role
            }
        case REMOVE_USER: 
            return state = initialState
            
        default: return state
    }
}

export default UserReducer