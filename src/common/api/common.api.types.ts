export type ResponseType<T = {}> = {
    resultCode: ResultCode
    messages: string[]
    data: T
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10,
}
