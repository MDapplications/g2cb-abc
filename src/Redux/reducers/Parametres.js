import { ADD_PARAMETRE, REMOVE_PARAMETRE } from '../Constantes'

//initial state
const initialState = {
    club: 'ABC',
    sendmail: ''
}




//reducer
const reducerParams = (state=initialState, action) => {
    switch (action.type) {
        case ADD_PARAMETRE:
            return {
                ...state,
                club: action.payload.club,
                sendmail: action.payload.sendmail
            }

        case REMOVE_PARAMETRE: 
            return state = initialState
            
        default: return state
    }
}

export default reducerParams


