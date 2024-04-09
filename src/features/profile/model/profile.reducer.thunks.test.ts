import { profileAPI } from 'features/profile/api/profile.api'
import {
    getUserProfile,
    getUserStatus,
    sendPhoto,
    setUserPhotos,
    setUserProfile,
    setUserStatus,
    updateUserStatus,
} from 'features/profile/model/profile.reducer'
import { ContactsType, ProfileType } from 'features/profile/api/profile.api.types'
import { ResponseType, ResultCode } from 'common/api'
import { PhotosType } from 'features/users/api/users.api.types'

jest.mock('features/profile/api/profile.api')
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('profile-reducer-thunks', () => {
    beforeEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

    it('should get user profile correctly', async () => {
        const res: ProfileType = {
            userId: 1,
            lookingForAJob: true,
            lookingForAJobDescription: 'React, typescript, redux',
            fullName: 'John Doe',
            contacts: {} as ContactsType,
            aboutMe: 'Frontend developer',
            photos: {
                large: 'large photo',
                small: 'small photo',
            },
        }

        profileAPIMock.getUserProfile.mockReturnValue(Promise.resolve(res))
        const thunk = getUserProfile('1')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserProfile(res))
    })

    it('should get user status correctly', async () => {
        const res: string = 'Status'

        profileAPIMock.getUserStatus.mockReturnValue(Promise.resolve(res))
        const thunk = getUserStatus('1')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserStatus(res))
    })

    it('should update user status correctly', async () => {
        const res: ResponseType = {
            resultCode: ResultCode.SUCCESS,
            messages: [],
            data: {},
        }
        const status = 'Updated status'

        profileAPIMock.updateUserStatus.mockReturnValue(Promise.resolve(res))
        const thunk = updateUserStatus(status)
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserStatus(status))
    })

    it('should send photo correctly', async () => {
        const res: ResponseType<{ photos: PhotosType }> = {
            resultCode: ResultCode.SUCCESS,
            messages: [],
            data: {
                photos: {
                    large: 'large photo',
                    small: 'small photo',
                },
            },
        }

        profileAPIMock.sendPhoto.mockReturnValue(Promise.resolve(res))
        const thunk = sendPhoto('photo')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserPhotos(res.data.photos))
    })
})
