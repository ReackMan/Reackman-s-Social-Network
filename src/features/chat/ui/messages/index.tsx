import { useEffect, useRef, useState, UIEvent } from 'react'
import { useSelector } from 'react-redux'

import { Message } from 'features/chat/ui/messages/message'
import styles from 'features/chat/ui/messages/messages.module.scss'
import { getMessages } from 'features/chat/model/chat.selectors'

export const Messages = () => {
    const messages = useSelector(getMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    useEffect(() => {
        if (!isAutoScroll) return
        messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        // eslint-disable-next-line
    }, [messages])

    const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    const messagesItems = messages.map((message, idx) => (
        <Message key={message.id} message={message} />
    ))
    return (
        <div className={styles.messages} onScroll={onScrollHandler}>
            {messagesItems}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
