export const requiredField: FieldValidatorType = (value: string) => {
    return value ? undefined : 'Field is required'
}

export const maxLengthCreator =
    (maxLength: number): FieldValidatorType =>
    (value: string) => {
        return value.length <= maxLength
            ? undefined
            : `The maximum length must not exceed ${maxLength} characters`
    }

export type FieldValidatorType = (value: string) => string | undefined
