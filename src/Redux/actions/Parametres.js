import { ADD_PARAMETRE, REMOVE_PARAMETRE } from '../Constantes'


export const addParams = data => {
    return {
        type: ADD_PARAMETRE,
        payload: data
    }
}

export const removeParams = () => {
    return {
        type: REMOVE_PARAMETRE
    }
}