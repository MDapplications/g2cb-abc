import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadCommandeModif = createAction('commande-modif/load')
export const addBonCommandeModif = createAction('commande-modif/add/bon')
export const addArticleCommandeModif = createAction('commande-modif/add/article')
export const removeArticleCommandeModif = createAction('commande-modif/remove/article')
export const updateArticleCommandeModif = createAction('commande-modif/update/article')
export const removeCommandeModif = createAction('commande-modif/remove')
