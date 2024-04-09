import { memo } from 'react'

import styles from 'features/chat/ui/messages/message/message.module.scss'
import { DomainMessageType } from 'features/chat/api/chat.api'
import userDefault from 'common/img/user.jpg'

type Props = {
    message: DomainMessageType
}

export const Message = memo(({ message }: Props) => {
    return (
        <div className={styles.message}>
            <div className={styles.userInfo}>
                <img className={styles.photo} src={message.photo || userDefault} alt="avatar" />
                <b>{message.userName}</b>
            </div>
            <p>{message.message}</p>
        </div>
    )
})
