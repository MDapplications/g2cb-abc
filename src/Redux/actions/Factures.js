import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadFacture = createAction('facture/loading')
export const addFacture = createAction('facture/add')
export const addArticleFacture = createAction('facture/add/article')
export const addBonFacture = createAction('facture/add/bon')
export const reglerFacture = createAction('facture/update/regler')
export const removeFacture = createAction('facture/remove')
export const removeAllFacture = createAction('facture/remove/all')
