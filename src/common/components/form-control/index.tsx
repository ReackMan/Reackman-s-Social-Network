import { cloneElement, FC, ReactElement, ReactNode } from 'react'
import { Field, WrappedFieldProps } from 'redux-form'

import styles from 'common/components/form-control/form-control.module.scss'
import { FieldValidatorType } from 'common/utils/validators/validators'

type Props = WrappedFieldProps & {
    children: ReactNode
}

const FormControl = ({ input, meta: { touched, error }, children, ...props }: Props) => {
    const hasError = touched && error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            {cloneElement(children as ReactElement<ReactNode>, { ...input, ...props })}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const CustomTextarea = (props: Props) => (
    <FormControl {...props}>
        <textarea />
    </FormControl>
)

export const CustomInput = (props: Props) => (
    <FormControl {...props}>
        <input />
    </FormControl>
)

export function createField<FormKeyType extends string>(
    name: FormKeyType,
    validators: FieldValidatorType[],
    component: FC<Props>,
    props = {},
) {
    return <Field name={name} validate={validators} component={component} {...props} />
}

// types
export type GetStringKeys<T> = Extract<keyof T, string>
