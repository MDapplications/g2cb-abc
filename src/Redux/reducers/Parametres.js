import { ADD_PARAMETRE, REMOVE_PARAMETRE } from '../Constantes'

//initial state
const initialState = {
    adresse: '',
    code_postal: '',
    ville: '',
    club: 'ABC',
    sendmail: ''
}




//reducer
const reducerParams = (state=initialState, action) => {
    switch (action.type) {
        case ADD_PARAMETRE:
            return {
                ...state,
                adresse: action.payload.adresse,
                code_postal: action.payload.code_postal,
                ville: action.payload.ville,
                club: action.payload.club,
                sendmail: action.payload.sendmail
            }

        case REMOVE_PARAMETRE: 
            return state = initialState
            
        default: return state
    }
}

export default reducerParams


