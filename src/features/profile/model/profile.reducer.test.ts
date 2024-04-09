import {
    profileReducer,
    setUserProfile,
    setUserStatus,
    InitialProfileStateType,
} from 'features/profile/model/profile.reducer'
import { ContactsType, ProfileType } from 'features/profile/api/profile.api.types'

describe('profile-reducer', () => {
    let initialState: InitialProfileStateType

    beforeEach(() => {
        initialState = {
            profileData: {} as ProfileType,
            status: '',
        }
    })

    it('should set the user profile in the state correctly', () => {
        const profile = {
            userId: 1235,
            lookingForAJob: true,
            lookingForAJobDescription: 'react-developer',
            fullName: 'John Doe',
            contacts: {} as ContactsType,
            aboutMe: '',
            photos: {
                large: 'large',
                small: 'small',
            },
        }
        const action = setUserProfile(profile)
        const newState = profileReducer(initialState, action)

        expect(newState.profileData).toEqual(profile)
    })

    it('should set the user status in the state correctly', () => {
        const status = 'Online'
        const action = setUserStatus(status)
        const newState = profileReducer(initialState, action)

        expect(newState.status).toBe(status)
    })
})
