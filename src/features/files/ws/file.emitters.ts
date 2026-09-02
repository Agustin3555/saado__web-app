import type { Socket } from 'socket.io-client'
import { CLIENT_EVENTS } from './file.events'

export const subscribeGlobalAnalysis = (socket: Socket) => {
  socket.emit(CLIENT_EVENTS.SUBSCRIBE_GLOBAL)
}

export const unsubscribeGlobalAnalysis = (socket: Socket) => {
  socket.emit(CLIENT_EVENTS.UNSUBSCRIBE_GLOBAL)
}

export const subscribeFile = (socket: Socket, fileId: number) => {
  socket.emit(CLIENT_EVENTS.SUBSCRIBE_FILE, fileId)
}

export const unsubscribeFile = (socket: Socket, fileId: number) => {
  socket.emit(CLIENT_EVENTS.UNSUBSCRIBE_FILE, fileId)
}
