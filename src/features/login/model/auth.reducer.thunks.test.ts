import { authAPI } from 'features/login/api/auth.api'
import { ResponseType, ResultCode } from 'common/api'
import { AuthResponseType } from 'features/login/api/auth.api.types'
import { getAuthUser, setUserData } from 'features/login/model/auth.reducer'

jest.mock('features/login/api/auth.api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('auth-reducer-thunks', () => {
    beforeEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

    it('should get auth user correctly', async () => {
        const res: ResponseType<AuthResponseType> = {
            resultCode: ResultCode.SUCCESS,
            messages: [],
            data: {
                email: 'test@gmail.com',
                login: 'user001',
                id: 1,
            },
        }

        authAPIMock.me.mockReturnValue(Promise.resolve(res))
        const thunk = getAuthUser()
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserData(res.data, true))
    })
})
