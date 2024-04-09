import { instance, ResponseType } from 'common/api'
import { FilterType, UsersResponseType } from 'features/users/api/users.api.types'

export const usersAPI = {
    getUsers(page: number = 1, pageSize: number = 5, filter: FilterType) {
        const { name = '', friend = null } = filter
        return instance
            .get<UsersResponseType>(
                `users?page=${page}&count=${pageSize}&term=${name}&friend=${friend ? friend : ''}`,
            )
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, {}).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`, {}).then(response => response.data)
    },
}
