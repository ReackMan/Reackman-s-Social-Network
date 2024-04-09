export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
