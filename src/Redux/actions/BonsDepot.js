import {LOAD_BON_DEPOT,
        ADD_BON_DEPOT,
        FACTURABLE_BON_DEPOT,
        REMOVE_BON_DEPOT, 
        REMOVE_ALL_BON_DEPOT} from '../Constantes'



//Action: chargement des bons pour dépot
export const loadBonDepot = () => {
    return {
        type: LOAD_BON_DEPOT
    }
}


//Action: Ajouter un bon pour dépot
export const addBonDepot = data => {
    return {
        type: ADD_BON_DEPOT,
        payload: data
    }
}

//Action: supprimer un bon pour dépot
export const removeBonDepot = id => {
    return {
        type: REMOVE_BON_DEPOT,
        payload: id
    }
}


//Action: changer l'etat forFacture du bon pour dépot
export const facturableBonDepot = (id, value) => {
    return {
        type: FACTURABLE_BON_DEPOT,
        payload: {
            id,
            value
        }
    }
}


//Action: Supprimer tout les bons pour dépot
export const removeAllBonDepot = id => {
    return {
        type: REMOVE_ALL_BON_DEPOT
    }
}