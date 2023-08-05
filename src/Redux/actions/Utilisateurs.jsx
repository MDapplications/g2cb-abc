import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadUsers = createAction('utilisateurs/loading')
export const addUsers = createAction('utilisateurs/add')
export const updateRoleUsers = createAction('utilisateurs/update/role')
export const deleteUsers = createAction('utilisateurs/delete')
export const removeAllUsers = createAction('utilisateurs/remove/all')