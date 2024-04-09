import { AppThunkDispatch, AppThunkType } from 'app/model/store'
import { ResponseType, ResultCode } from 'common/api'
import { FilterType, UserType } from 'features/users/api/users.api.types'
import { usersAPI } from 'features/users/api/users.api'

const initialState = {
    users: [] as UserType[],
    pageSize: 5,
    filter: {} as FilterType,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as number[], // array of user id
}

export const usersReducer = (
    state: InitialUsersStateType = initialState,
    action: UsersActionsType,
): InitialUsersStateType => {
    switch (action.type) {
        case 'USERS/SET-USERS':
            return { ...state, users: [...action.payload.users] }
        case 'USERS/SET-CURRENT-PAGE':
            return { ...state, currentPage: action.payload.currentPage }
        case 'USERS/SET-USERS-FILTER':
            return { ...state, filter: { ...state.filter, ...action.payload.filter } }
        case 'USERS/TOGGLE-FOLLOW-USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.userId
                        ? { ...user, followed: action.payload.isFollow }
                        : user,
                ),
            }
        case 'USERS/SET-TOTAL-USERS-COUNT':
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case 'USERS/TOGGLE-IS-FETCHING':
            return { ...state, isFetching: action.payload.isFetching }
        case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state,
                isFollowingInProgress: action.payload.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.payload.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.payload.userId),
            }
        default:
            return state
    }
}

// actions
export const setUsers = (users: UserType[]) =>
    ({ type: 'USERS/SET-USERS', payload: { users } }) as const
export const toggleFollowUser = (userId: number, isFollow: boolean) =>
    ({ type: 'USERS/TOGGLE-FOLLOW-USER', payload: { userId, isFollow } }) as const
export const setCurrentPage = (currentPage: number) =>
    ({ type: 'USERS/SET-CURRENT-PAGE', payload: { currentPage } }) as const
export const setUsersFilter = (filter: FilterType) =>
    ({ type: 'USERS/SET-USERS-FILTER', payload: { filter } }) as const
export const setTotalUsersCount = (totalUsersCount: number) =>
    ({ type: 'USERS/SET-TOTAL-USERS-COUNT', payload: { totalUsersCount } }) as const
export const toggleIsFetching = (isFetching: boolean) =>
    ({ type: 'USERS/TOGGLE-IS-FETCHING', payload: { isFetching } }) as const
export const toggleIsFollowingProgress = (isFollowingInProgress: boolean, userId: number) =>
    ({
        type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS',
        payload: { isFollowingInProgress, userId },
    }) as const

// thunks
export const requestUsers =
    (page: number, pageSize: number, filter: FilterType): AppThunkType =>
    async dispatch => {
        try {
            dispatch(toggleIsFetching(true))
            dispatch(setCurrentPage(page))
            dispatch(setUsersFilter(filter))
            const res = await usersAPI.getUsers(page, pageSize, filter)
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(toggleIsFetching(false))
        }
    }

const toggleFollowStatus = async (
    userId: number,
    toggleFollowMethod: (userId: number) => Promise<ResponseType>,
    isFollow: boolean,
    dispatch: AppThunkDispatch,
) => {
    try {
        dispatch(toggleIsFollowingProgress(true, userId))
        const res = await toggleFollowMethod(userId)
        res.resultCode === ResultCode.SUCCESS && dispatch(toggleFollowUser(userId, isFollow))
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleIsFollowingProgress(false, userId))
    }
}

export const followUser =
    (userId: number): AppThunkType =>
    async dispatch => {
        await toggleFollowStatus(userId, usersAPI.follow.bind(usersAPI), true, dispatch)
    }

export const unfollowUser =
    (userId: number): AppThunkType =>
    async dispatch => {
        await toggleFollowStatus(userId, usersAPI.unfollow.bind(usersAPI), false, dispatch)
    }

// types
export type InitialUsersStateType = typeof initialState
export type UsersActionsType =
    | ReturnType<typeof setUsers>
    | ReturnType<typeof toggleFollowUser>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersFilter>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>
