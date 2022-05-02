import { ADD_BON_MEMBRE, REMOVE_BON_MEMBRE, REMOVE_ALL_BON_MEMBRE } from '../Constantes'


export const addBonMembre = data => {
    return {
        type: ADD_BON_MEMBRE,
        payload: data  // object: BonMembre
    }
}

export const removeBonMembre = id => {
    return {
        type: REMOVE_BON_MEMBRE,
        payload: id
    }
}


export const removeAllBonMembre = () => {
    return {
        type: REMOVE_ALL_BON_MEMBRE
    }
}