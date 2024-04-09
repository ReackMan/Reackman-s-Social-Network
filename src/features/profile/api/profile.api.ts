import { ProfileDataFormType } from 'features/profile/ui/profile-info/profile-data-form'
import { instance, ResponseType } from 'common/api'
import { ProfileType } from 'features/profile/api/profile.api.types'
import { PhotosType } from 'features/users/api/users.api.types'

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getUserStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateUserProfile(profile: ProfileDataFormType) {
        return instance.put<ResponseType>(`profile`, profile).then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance
            .put<ResponseType>(`profile/status`, { status })
            .then(response => response.data)
    },
    sendPhoto(file: string) {
        const formData = new FormData()
        formData.append('image', file)
        return instance
            .put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data)
    },
}
