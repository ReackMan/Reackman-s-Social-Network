import {
    followUser,
    requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    setUsersFilter,
    toggleFollowUser,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollowUser,
} from 'features/users/model/users.reducer'
import { usersAPI } from 'features/users/api/users.api'
import { ResponseType, ResultCode } from 'common/api'
import { UsersResponseType } from 'features/users/api/users.api.types'

jest.mock('features/users/api/users.api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('users-reducer-thunks', () => {
    beforeEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

    it('should follow a user correctly', async () => {
        const res: ResponseType = {
            resultCode: ResultCode.SUCCESS,
            messages: [],
            data: {},
        }
        const userId = 1

        userAPIMock.follow.mockReturnValue(Promise.resolve(res))
        const thunk = followUser(userId)
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleFollowUser(userId, true))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, userId))
    })

    it('should unfollow a user correctly', async () => {
        const res: ResponseType = {
            resultCode: ResultCode.SUCCESS,
            messages: [],
            data: {},
        }
        const userId = 1

        userAPIMock.unfollow.mockReturnValue(Promise.resolve(res))
        const thunk = unfollowUser(userId)
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleFollowUser(userId, false))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, userId))
    })

    it('should request users correctly', async () => {
        const res: UsersResponseType = {
            items: [],
            totalCount: 10,
            error: '',
        }
        const page = 1
        const pageSize = 10
        const term = ''

        userAPIMock.getUsers.mockReturnValue(Promise.resolve(res))
        const thunk = requestUsers(page, pageSize, { name: term })
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(6)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCurrentPage(page))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsersFilter({ name: term }))
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setUsers(res.items))
        expect(dispatchMock).toHaveBeenNthCalledWith(5, setTotalUsersCount(res.totalCount))
        expect(dispatchMock).toHaveBeenNthCalledWith(6, toggleIsFetching(false))
    })
})
