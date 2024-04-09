import { ComponentPropsWithoutRef } from 'react'
import styles from 'common/components/button/button.module.scss'

type ButtonPropsType = ComponentPropsWithoutRef<'button'> & {
    title: string
    callback?: () => void
}

export const Button = ({ title, callback, ...rest }: ButtonPropsType) => {
    return (
        <button className={styles.button} onClick={callback} {...rest}>
            {title}
        </button>
    )
}
