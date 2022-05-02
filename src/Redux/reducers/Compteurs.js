import {ADD_COMPTEUR_COMMANDE,
        ADD_COMPTEUR_FACTURE,
        ADD_COMPTEUR_RETOUR, 
        INIT_COMPTEURS} from '../Constantes'


//initial state
const initialState = {
    compteurs: {
        commande: 1,
        facture: 1,
        retour: 1
    }
}

//reducer
const reducerCompteurs = (state=initialState.compteurs, action) => {

    if(localStorage.getItem('Compteurs')) {
        state = JSON.parse(localStorage.getItem('Compteurs'))
    } 

    switch (action.type) {
        case INIT_COMPTEURS:
            state = initialState.compteurs
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state

        case ADD_COMPTEUR_COMMANDE:
            state.commande = state.commande + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state

        case ADD_COMPTEUR_FACTURE:
            state.facture = state.facture + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state

        case ADD_COMPTEUR_RETOUR:
            state.retour = state.retour + 1
            localStorage.setItem('Compteurs', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerCompteurs
