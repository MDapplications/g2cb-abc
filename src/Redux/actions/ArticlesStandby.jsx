import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const loadArticleStandby = createAction('article-standby/loading')
export const changeClubArticleStandby = createAction('article-standby/update/club')
export const commandableArticleStandby = createAction('article-standby/update/commandable')
export const removeArticleStandby = createAction('article-standby/remove')
