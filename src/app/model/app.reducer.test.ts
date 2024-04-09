import { appReducer, InitialAppStateType, setInitializedSuccess } from 'app/model/app.reducer'

describe('app-reducer', () => {
    let initialState: InitialAppStateType

    beforeEach(() => {
        initialState = {
            initialized: false,
        }
    })

    it('should set initialized success', () => {
        const action = setInitializedSuccess()
        const newState = appReducer(initialState, action)

        expect(appReducer(initialState, action)).toEqual(newState)
    })
})
