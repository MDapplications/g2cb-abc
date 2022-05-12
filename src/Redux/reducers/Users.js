import { ADD_USER, UPDATE_USER, REMOVE_USER } from '../Constantes'


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
const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                prenom: action.payload.prenom,
                nom: action.payload.nom,
                email: action.payload.email,
                adresse: action.payload.adresse,
                code_postal: action.payload.code_postal,
                ville: action.payload.ville,
                role: action.payload.role
            }

        case UPDATE_USER:
            return {
                ...state,
                adresse: action.payload.adresse,
                code_postal: action.payload.code_postal,
                ville: action.payload.ville,
            }
        case REMOVE_USER: 
            return state = initialState
            
        default: return state
    }
}

export default UserReducer