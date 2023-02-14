import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const addArticleMembre = createAction('article-membre/add')
export const removeArticleMembre = createAction('article-membre/remove')
export const removeAllArticleMembre = createAction('article-membre/remove/all')
