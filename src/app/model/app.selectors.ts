import { AppStateType } from 'app/model/store'
import { createSelector } from 'reselect'

// selectors
const getInitializedSelector = (state: AppStateType) => state.app.initialized

// selectors with reselect
export const getInitialized = createSelector(
    getInitializedSelector,
    (initialized: boolean) => initialized,
)
