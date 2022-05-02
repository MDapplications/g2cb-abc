import { ADD_BON_MEMBRE, REMOVE_BON_MEMBRE, REMOVE_ALL_BON_MEMBRE } from '../Constantes'
import { v4 as uuiv4} from 'uuid'


//initial state
const initialState = {
    BonsMembre: []
}


//helper add Data
const helperAdddata = action => {
    return {
        id: uuiv4(),
        reference: action.payload.reference,
        montant: action.payload.montant,
        date: action.payload.date,
    }
}


//helper remove data
const removeDataById = (state, id) => {
    const Bons = state.filter(Bon => Bon.id !== id)
    return Bons
}





//reducer
const reducerBonMembre = (state=initialState.BonsMembre, action) => {

    if(localStorage.getItem('BonsMembre')) {
        state = JSON.parse(localStorage.getItem('BonsMembre'))
    }

    switch (action.type) {
        case ADD_BON_MEMBRE:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('BonsMembre', JSON.stringify(state))
            return state
            
        case REMOVE_BON_MEMBRE:
            state = removeDataById(state, action.payload)
            localStorage.setItem('BonsMembre', JSON.stringify(state))
            return state
         
        case REMOVE_ALL_BON_MEMBRE:
            state = []
            localStorage.setItem('BonsMembre', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerBonMembre