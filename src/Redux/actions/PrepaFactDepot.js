import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const addPrepaFactDepot = createAction('prepa-facture-depot/add')
export const addArticlePrepaFactDepot = createAction('prepa-facture-depot/add/article')
export const addBonPrepaFactDepot = createAction('prepa-facture-depot/add/bon')
export const removeBonPrepaFactDepot = createAction('prepa-facture-depot/remove/bon')
export const removePrepaFactDepot = createAction('prepa-facture-depot/remove')
export const removeAllPrepaFactDepot = createAction('prepa-facture-depot/remove/all')
