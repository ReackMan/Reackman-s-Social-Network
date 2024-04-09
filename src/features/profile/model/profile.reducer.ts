import { stopSubmit } from 'redux-form'

import { AppThunkDispatch, AppThunkType } from 'app/model/store'
import { ResultCode } from 'common/api'
import { ProfileDataFormType } from 'features/profile/ui/profile-info/profile-data-form'
import { ProfileType } from 'features/profile/api/profile.api.types'
import { PhotosType } from 'features/users/api/users.api.types'
import { profileAPI } from 'features/profile/api/profile.api'

const initialState = {
    profileData: {} as ProfileType,
    status: '',
}

export const profileReducer = (
    state: InitialProfileStateType = initialState,
    action: ProfileActionsType,
): InitialProfileStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER-PROFILE':
            return {
                ...state,
                profileData: action.payload.profile,
            }
        case 'PROFILE/SET-UPDATED-USER-PROFILE':
            return {
                ...state,
                profileData: { ...state.profileData, ...action.payload.profile },
            }
        case 'PROFILE/SET-USER-STATUS':
            return {
                ...state,
                status: action.payload.status,
            }
        case 'PROFILE/SET-USER-PHOTOS':
            return {
                ...state,
                profileData: { ...state.profileData, photos: action.payload.photos },
            }
        default:
            return state
    }
}

// actions
export const setUserProfile = (profile: ProfileType) =>
    ({ type: 'PROFILE/SET-USER-PROFILE', payload: { profile } }) as const
export const setUserStatus = (status: string) =>
    ({ type: 'PROFILE/SET-USER-STATUS', payload: { status } }) as const
export const setUserPhotos = (photos: PhotosType) =>
    ({ type: 'PROFILE/SET-USER-PHOTOS', payload: { photos } }) as const
export const setUpdatedUserProfile = (profile: ProfileDataFormType) =>
    ({ type: 'PROFILE/SET-UPDATED-USER-PROFILE', payload: { profile } }) as const

// thunks
export const getUserProfile =
    (userId: string): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        try {
            const res = await profileAPI.getUserProfile(userId)
            dispatch(setUserProfile(res))
        } catch (e) {
            console.error(e)
        }
    }

export const getUserStatus =
    (userId: string): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        try {
            const res = await profileAPI.getUserStatus(userId)
            dispatch(setUserStatus(res))
        } catch (e) {
            console.error(e)
        }
    }

export const updateUserStatus =
    (status: string): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        try {
            const res = await profileAPI.updateUserStatus(status)
            res.resultCode === ResultCode.SUCCESS && dispatch(setUserStatus(status))
        } catch (e) {
            console.error(e)
        }
    }

export const updateProfile =
    (profile: ProfileDataFormType): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        try {
            const res = await profileAPI.updateUserProfile(profile)
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(setUpdatedUserProfile(profile))
            } else {
                dispatch(
                    stopSubmit('edit-profile', {
                        _error: res.messages[0] || 'Incorrect data',
                    }),
                )
                return Promise.reject(res.messages[0])
            }
        } catch (e) {
            console.error(e)
        }
    }

export const sendPhoto =
    (file: string): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        try {
            const res = await profileAPI.sendPhoto(file)
            res.resultCode === ResultCode.SUCCESS && dispatch(setUserPhotos(res.data.photos))
        } catch (e) {
            console.error(e)
        }
    }

// types
export type InitialProfileStateType = typeof initialState
export type ProfileActionsType =
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setUserPhotos>
    | ReturnType<typeof setUpdatedUserProfile>
