import { ADD_USER, UPDATE_USER, REMOVE_USER } from '../Constantes'


export const addUser = data => {
    return {
        type: ADD_USER,
        payload: data
    }
}

export const updateUser = data => {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

