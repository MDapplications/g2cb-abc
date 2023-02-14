import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const addUser = createAction('user/add')
export const updateUser = createAction('user/update')
export const removeUser = createAction('user/remove')