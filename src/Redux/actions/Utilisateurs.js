import {    LOAD_USERS, 
            ADD_USERS, 
            UPDATE_ROLE_USERS,
            DELETE_USERS,
            REMOVE_ALL_USERS} from '../Constantes'

            
//Action : attente de chargement de la liste des utilisateurs
export const loadUsers = () => {
    return {
        type: LOAD_USERS
    }
}

//Action : ajout d'un utilisateur dans la liste
export const addUsers = data => {
    return {
        type: ADD_USERS,
        payload: data
    }
}

//Action : mise à jour du role d'un utilisateur
export const updateRoleUsers = (id, role) => {
    return {
        type: UPDATE_ROLE_USERS,
        payload: {
            id,
            role
        }
    }
}

//Action : suppression de l'utilisateur
export const deleteUsers = id => {
    return {
        type: DELETE_USERS,
        payload: id
    }
}

//Action : Vidage de la liste utilisateurs
export const removeAllUsers = () => {
    return {
        type: REMOVE_ALL_USERS
    }
}