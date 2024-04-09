import { AppThunkDispatch, AppThunkType } from 'app/model/store'
import { chatAPI, DomainMessageType, MessageType, StatusType } from 'features/chat/api/chat.api'
import { v1 } from 'uuid'

const initialState = {
    messages: [] as DomainMessageType[],
    status: 'pending' as StatusType,
}

export const chatReducer = (
    state: InitialChatStateType = initialState,
    action: ChatActionsType,
): InitialChatStateType => {
    switch (action.type) {
        case 'CHAT/SET-MESSAGES':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map(message => ({
                        ...message,
                        id: v1(),
                    })),
                ].filter((_, idx, array) => idx >= array.length - 100),
            }
        case 'CHAT/CHANGE-STATUS':
            return {
                ...state,
                status: action.payload.status,
            }
        case 'CHAT/CLEAR-MESSAGES':
            return {
                ...state,
                messages: [],
            }
        default:
            return state
    }
}

// utils
let _newMessageHandler: ((messages: MessageType[]) => void) | null = null
const onMessageHandlerCreator = (dispatch: AppThunkDispatch) => {
    if (!_newMessageHandler) {
        _newMessageHandler = (messages: MessageType[]) => {
            dispatch(setMessages(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const onStatusChangedHandlerCreator = (dispatch: AppThunkDispatch) => {
    if (!_statusChangedHandler) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(changeStatus(status))
        }
    }

    return _statusChangedHandler
}

// actions
export const setMessages = (messages: MessageType[]) =>
    ({ type: 'CHAT/SET-MESSAGES', payload: { messages } }) as const
export const changeStatus = (status: StatusType) =>
    ({ type: 'CHAT/CHANGE-STATUS', payload: { status } }) as const
export const clearMessages = () => ({ type: 'CHAT/CLEAR-MESSAGES' }) as const

// thunks
export const startMessagesListening = (): AppThunkType => async (dispatch: AppThunkDispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', onMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', onStatusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunkType => async (dispatch: AppThunkDispatch) => {
    chatAPI.unsubscribe('message-received', onMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', onStatusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(clearMessages())
}

export const sendMessage =
    (message: string): AppThunkType =>
    async (dispatch: AppThunkDispatch) => {
        chatAPI.sendMessage(message)
    }

// types
export type InitialChatStateType = typeof initialState
export type ChatActionsType =
    | ReturnType<typeof setMessages>
    | ReturnType<typeof changeStatus>
    | ReturnType<typeof clearMessages>
