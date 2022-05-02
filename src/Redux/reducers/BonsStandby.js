import {LOAD_BON_STANDBY,
        COMANDABLE_BON_STANDBY,
        DELETE_BON_STANDBY, 
        REMOVE_BON_STANDBY} from '../Constantes'



//initial state
const initialState = {
    BonsStandby: []
}


//helper remove data
const removeDataById = (state, id) => {
    const bon = state.filter(bon => bon.id !== id)
    return bon
}


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
const reducerBonStandby = (state=initialState.BonsStandby, action) => {

    if(localStorage.getItem('BonsStandby')) {
        state = JSON.parse(localStorage.getItem('BonsStandby'))
    }

    switch (action.type) {
        case LOAD_BON_STANDBY:
            return state

        case COMANDABLE_BON_STANDBY:
            state = commandableDataById(state, action.payload)
            localStorage.setItem('BonsStandby', JSON.stringify(state))
            return state

        case DELETE_BON_STANDBY:
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsStandby', JSON.stringify(state))
            return state

        case REMOVE_BON_STANDBY:
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsStandby', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerBonStandby