import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const addBonMembre = createAction('bon-membre/add')
export const removeBonMembre = createAction('bon-membre/remove')
export const removeAllBonMembre = createAction('bon-membre/remove/all')
