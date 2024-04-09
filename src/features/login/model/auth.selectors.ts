import { createSelector } from 'reselect'
import { AppStateType } from 'app/model/store'

// selectors
const getUserIdSelector = (state: AppStateType) => state.auth.id
const getUserEmailSelector = (state: AppStateType) => state.auth.email
const getUserLoginSelector = (state: AppStateType) => state.auth.login
const getIsAuthSelector = (state: AppStateType) => state.auth.isAuth
const getCaptchaUrlSelector = (state: AppStateType) => state.auth.captchaUrl

// selectors with reselect
export const getAuthUserId = createSelector(getUserIdSelector, (id: number | null) => id)
export const getUserEmail = createSelector(getUserEmailSelector, (email: string | null) => email)
export const getUserLogin = createSelector(getUserLoginSelector, (login: string | null) => login)
export const getIsAuth = createSelector(getIsAuthSelector, (isAuth: boolean | null) => isAuth)
export const getCaptchaUrl = createSelector(
    getCaptchaUrlSelector,
    (captchaUrl: string | null) => captchaUrl,
)
