import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadBonDepot = createAction('bon-depot/loading')
export const addBonDepot = createAction('bon-depot/add')
export const removeBonDepot = createAction('bon-depot/remove')
export const facturableBonDepot = createAction('bon-depot/update/facturable')
export const removeAllBonDepot = createAction('bon-depot/remove/all')
