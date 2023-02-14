import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadFactureModif = createAction('facture-modif/load')
export const addBonFactureModif = createAction('facture-modif/add/bon')
export const addArticleFactureModif = createAction('facture-modif/add/article')
export const removeArticleFactureModif = createAction('facture-modif/remove/article')
export const updateArticleFactureModif = createAction('facture-modif/update/article')
export const removeFactureModif = createAction('facture-modif/remove')