import {
    authReducer,
    InitialAuthUserDataStateType,
    setUserData,
} from 'features/login/model/auth.reducer'

describe('auth-reducer', () => {
    let initialState: InitialAuthUserDataStateType

    beforeEach(() => {
        initialState = {
            id: null,
            email: null,
            login: null,
            isAuth: false,
            captchaUrl: null,
        }
    })

    it('should set user data to the state correctly', () => {
        const data = {
            id: 1,
            email: 'test@example.com',
            login: 'testuser',
        }
        const isAuth = true
        const action = setUserData(data, isAuth)

        const newState = authReducer(initialState, action)

        expect(authReducer(initialState, action)).toEqual(newState)
    })
})
