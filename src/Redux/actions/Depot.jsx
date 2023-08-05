import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadDepot = createAction('depot/loading')
export const addArticleDepot = createAction('depot/add/article')
export const removeArticleDepot = createAction('depot/remove/article')
export const facturableArticleDepot = createAction('depot/update/article/facturable')
export const retournableArticleDepot = createAction('depot/update/article/retournable')
export const removeAllDepot = createAction('depot/remove/all')
