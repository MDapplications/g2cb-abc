import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const addPrepaFacture = createAction('prepa-facture/add')
export const addArticlePrepaFacture = createAction('prepa-facture/add/article')
export const addBonPrepaFacture = createAction('prepa-facture/add/bon')
export const removePrepaFacture = createAction('prepa-facture/remove')
export const removeAllPrepaFacture = createAction('prepa-facture/remove/all')
