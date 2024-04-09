import { instance, ResponseType } from 'common/api'
import { AuthResponseType, LoginType } from './auth.api.types'

export const authAPI = {
    me() {
        return instance
            .get<ResponseType<AuthResponseType>>(`auth/me`)
            .then(response => response.data)
    },
    login(data: LoginType) {
        return instance
            .post<ResponseType<{ userId: number }>>(`auth/login`, data)
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`).then(response => response.data)
    },
}
