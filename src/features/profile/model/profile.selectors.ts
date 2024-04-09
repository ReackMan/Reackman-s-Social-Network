import { createSelector } from 'reselect'

import { AppStateType } from 'app/model/store'
import { ProfileType } from 'features/profile/api/profile.api.types'

// selectors
const getProfileSelector = (state: AppStateType) => state.profile.profileData
const getStatusSelector = (state: AppStateType) => state.profile.status
const getUserIdSelector = (state: AppStateType) => state.profile.profileData.userId
const getProfileAvatarSelector = (state: AppStateType) => state.profile.profileData.photos

// selectors with reselect
export const getProfile = createSelector(getProfileSelector, (profile: ProfileType) => profile)
export const getProfileAvatar = createSelector(getProfileAvatarSelector,
    (photos: {large: string, small: string }) => photos)
export const getStatus = createSelector(getStatusSelector, (status: string) => status)
export const getUserId = createSelector(getUserIdSelector, (userId: number) => userId)
