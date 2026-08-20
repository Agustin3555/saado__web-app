import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleUser } from '../user.types'

interface UsersStore {
  users?: SimpleUser[]
  usersRecord?: Record<number, SimpleUser>
  refetchUsers: () => Promise<void>
}

export const useUsersStore = create<UsersStore>(set => ({
  refetchUsers: async () => {
    const { data: users } = await privateInstance.get<SimpleUser[]>('users')

    const usersRecord = Object.fromEntries(users.map(o => [o.id, o]))

    set({ users, usersRecord })
  },
}))
