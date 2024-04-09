import { instance } from 'common/api'
import { getCaptchaUrlType } from './security.api.types'

export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get<getCaptchaUrlType>(`security/get-captcha-url`)
            .then(response => response.data)
    },
}
