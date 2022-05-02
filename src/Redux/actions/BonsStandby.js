import {LOAD_BON_STANDBY, 
        COMANDABLE_BON_STANDBY,
        DELETE_BON_STANDBY, 
        REMOVE_BON_STANDBY} from '../Constantes'


//Action: chargement des BONs en attente
export const loadBonStandby = () => {
    return {
        type: LOAD_BON_STANDBY
    }
}

//Action: Suppression d'un BON
export const commandableBonStandby = (id, value) => {
    return {
        type: COMANDABLE_BON_STANDBY,
        payload: {
            id,
            value
        }
    }
}

//Action: Suppression d'un BON
export const deleteBonStandby = id => {
    return {
        type: DELETE_BON_STANDBY,
        payload: id
    }
}

//Action: L'BON n'est plus en standby
export const removeBonStandby = id => {
    return {
        type: REMOVE_BON_STANDBY,
        payload: id
    }
}

