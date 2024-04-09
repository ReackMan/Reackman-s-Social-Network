import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer, FormAction } from 'redux-form'

import { profileReducer, ProfileActionsType } from 'features/profile/model/profile.reducer'
import { usersReducer, UsersActionsType } from 'features/users/model/users.reducer'
import { AuthActionsType, authReducer } from 'features/login/model/auth.reducer'
import { AppActionsType, appReducer } from 'app/model/app.reducer'
import { ChatActionsType, chatReducer } from 'features/chat/model/chat.reducer'

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    chat: chatReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
})
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store: StoreType = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
)

// types
export type RootActionsType =
    | AppActionsType
    | ProfileActionsType
    | ChatActionsType
    | UsersActionsType
    | AuthActionsType
    | FormAction
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type StoreType = Store<AppStateType, RootActionsType>
export type AppThunkDispatch = ThunkDispatch<AppStateType, any, RootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    RootActionsType
>
//@ts-ignore
window.store = store
