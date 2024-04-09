import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from 'features/chat/ui/chat.module.scss'
import { Messages } from 'features/chat/ui/messages'
import { AddMessageForm } from 'features/chat/ui/add-message-form'
import { startMessagesListening, stopMessagesListening } from 'features/chat/model/chat.reducer'
import { getStatus } from 'features/chat/model/chat.selectors'
import { Preloader } from 'common/components/preloader'
import { getIsAuth } from 'features/login/model/auth.selectors'

const Chat = () => {
    const status = useSelector(getStatus)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuth) return

        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
        // eslint-disable-next-line
    }, [])

    if (status === 'pending') return <Preloader />

    return (
        <div className={styles.chat}>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

export default Chat
