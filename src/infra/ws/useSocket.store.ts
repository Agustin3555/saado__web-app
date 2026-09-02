import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

interface SocketStore {
  socket?: Socket
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  isConnected: false,

  connect: () => {
    const { connected } = get().socket ?? {}
    if (connected) return

    // TODO: obtener desde un store que sincroniza con localStorage
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,
    })

    socket.on('connect', () => set({ isConnected: true }))
    socket.on('disconnect', () => set({ isConnected: false }))

    set({ socket })
  },

  disconnect: () => {
    const { socket } = get()
    if (!socket) return

    socket.removeAllListeners()
    socket.disconnect()

    set({ socket: undefined, isConnected: false })
  },
}))
