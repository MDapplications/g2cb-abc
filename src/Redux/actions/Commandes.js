import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadCommande = createAction('commande/loading')
export const addCommande = createAction('commande/add')
export const addArticleCommande = createAction('commande/add/article')
export const addBonCommande = createAction('commande/add/bon')
export const removeCommande = createAction('commande/remove')
export const removeAllCommande = createAction('commande/remove/all')
