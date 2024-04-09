let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(subscriber => subscriber(status))
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(subscriber => subscriber(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
}

const createChannel = () => {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(event: EventsType, callback: CallbackType) {
        // @ts-ignore
        subscribers[event].push(callback)
    },
    unsubscribe(event: EventsType, callback: CallbackType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(subscriber => subscriber !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}

// types
export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type DomainMessageType = MessageType & {
    id: string
}
export type EventsType = 'message-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'
type MessagesReceivedSubscriberType = (messages: MessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type CallbackType = MessagesReceivedSubscriberType | StatusChangedSubscriberType
