import { AppThunkDispatch, AppThunkType } from 'app/model/store'
import { getAuthUser } from 'features/login/model/auth.reducer'

const initialState = {
    initialized: false,
}

export const appReducer = (state = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED-SUCCESS':
            return { ...state, initialized: true }
        default:
            return state
    }
}

// actions
export const setInitializedSuccess = () => ({ type: 'APP/SET-INITIALIZED-SUCCESS' }) as const

// thunks
export const initializeApp = (): AppThunkType => async (dispatch: AppThunkDispatch) => {
    try {
        await dispatch(getAuthUser())
        dispatch(setInitializedSuccess())
    } catch (e) {
        console.error(e)
    }
}

// types
export type InitialAppStateType = typeof initialState
export type AppActionsType = ReturnType<typeof setInitializedSuccess>
