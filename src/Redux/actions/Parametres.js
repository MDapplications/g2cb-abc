import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const changeSelectYear = createAction('parameters/change-select-year')
export const addParams = createAction('parameters/add')
export const removeParams = createAction('parameters/remove')
