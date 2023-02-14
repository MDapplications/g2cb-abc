import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadBonStandby = createAction('bon-standby/loading')
export const commandableBonStandby = createAction('bon-standby/update/commandable')
export const removeBonStandby = createAction('bon-standby/remove')

