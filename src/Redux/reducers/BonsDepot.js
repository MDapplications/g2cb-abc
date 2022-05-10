import {LOAD_BON_DEPOT,
        ADD_BON_DEPOT,
        FACTURABLE_BON_DEPOT,
        REMOVE_BON_DEPOT, 
        REMOVE_ALL_BON_DEPOT} from '../Constantes'



//initial state
const initialState = []


//helper d'ajout de bon pour dépot 
const helperAddBon = (state, bon) => {
    state = [...state, bon]
    return state
}


//helper de mise à jour de l'article (facturable)
const facturableDataById = (state, action) => {
    state.forEach(bon => {
        if (bon.id === action.id) {
            bon.forFacture = action.value
        }
    })
    return state
}


//helper de suppression de bon pour depot
const removeDataById = (state, id) => {
    const bons = state.filter(bon => bon.id !== id)
    return bons
}




//reducer
const reducerBonsDepot = (state=initialState, action) => {

    if(localStorage.getItem('BonsDepot')) {
        state = JSON.parse(localStorage.getItem('BonsDepot'))
    }

    switch (action.type) {
        case LOAD_BON_DEPOT:
            return state

        case ADD_BON_DEPOT:
            state = helperAddBon(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state

        case FACTURABLE_BON_DEPOT:
            state = facturableDataById(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state

        case REMOVE_BON_DEPOT:
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state

        case REMOVE_ALL_BON_DEPOT:
            state = initialState
            localStorage.setItem('BonsDepot', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerBonsDepot