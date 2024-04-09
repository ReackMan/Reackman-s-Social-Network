import {
    usersReducer,
    InitialUsersStateType,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    UsersActionsType,
    toggleFollowUser,
} from 'features/users/model/users.reducer'
import { FilterType } from 'features/users/api/users.api.types'

describe('users-reducer', () => {
    let initialState: InitialUsersStateType

    beforeEach(() => {
        initialState = {
            users: [
                {
                    id: 1,
                    name: 'John',
                    status: 'Hello!',
                    photos: {
                        large: 'photo',
                        small: 'photo-small',
                    },
                    followed: false,
                },
                {
                    id: 2,
                    name: 'Jane',
                    status: 'Hello World!',
                    photos: {
                        large: 'photo',
                        small: 'photo-small',
                    },
                    followed: true,
                },
            ],
            pageSize: 5,
            totalUsersCount: 0,
            currentPage: 1,
            filter: {} as FilterType,
            isFetching: true,
            isFollowingInProgress: [],
        }
    })

    it('should set users to the state correctly', () => {
        const users = [
            {
                id: 3,
                name: 'John',
                status: 'Hello!',
                photos: {
                    large: 'photo',
                    small: 'photo-small',
                },
                followed: false,
            },
        ]
        const action: UsersActionsType = setUsers(users)

        const newState = usersReducer(initialState, action)

        expect(newState.users).toEqual(users)
    })

    it('should follow to the user correctly', () => {
        const userId = 1
        const action: UsersActionsType = toggleFollowUser(userId, true)

        const newState = usersReducer(initialState, action)

        expect(newState.users[0].followed).toBe(true)
    })

    it('should unfollow to the user correctly', () => {
        const userId = 2
        const action: UsersActionsType = toggleFollowUser(userId, false)

        const newState = usersReducer(initialState, action)

        expect(newState.users[1].followed).toBe(false)
    })

    it('should set current page correctly', () => {
        const currentPage = 2
        const action: UsersActionsType = setCurrentPage(currentPage)

        const newState = usersReducer(initialState, action)

        expect(newState.currentPage).toBe(currentPage)
    })

    it('should set total users count correctly', () => {
        const totalUsersCount = 10
        const action: UsersActionsType = setTotalUsersCount(totalUsersCount)

        const newState = usersReducer(initialState, action)

        expect(newState.totalUsersCount).toBe(totalUsersCount)
    })

    it('should toggle isFetching correctly', () => {
        const isFetching = false
        const action: UsersActionsType = toggleIsFetching(isFetching)

        const newState = usersReducer(initialState, action)

        expect(newState.isFetching).toBe(isFetching)
    })

    it('should toggle toggleIsFollowingProgress correctly', () => {
        const isFollowingInProgress = true
        const userId = 1
        const action: UsersActionsType = toggleIsFollowingProgress(isFollowingInProgress, userId)

        const newState = usersReducer(initialState, action)

        expect(newState.isFollowingInProgress).toEqual([userId])
    })
})
