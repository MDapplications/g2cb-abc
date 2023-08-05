import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadRetour = createAction('retour/loading')
export const addRetour = createAction('retour/add')
export const addArticleRetour = createAction('retour/add/article')
export const retournerRetour = createAction('retour/update/retourner')
export const removeRetour = createAction('retour/remove')
export const removeAllRetour = createAction('retour/remove/all')
