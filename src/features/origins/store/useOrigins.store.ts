import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleOrigin } from '../origin.types'

interface OriginsStore {
  origins?: SimpleOrigin[]
  originsRecord?: Record<number, SimpleOrigin>
  refetchOrigins: () => Promise<void>
}

export const useOriginsStore = create<OriginsStore>(set => ({
  refetchOrigins: async () => {
    const { data: origins } =
      await privateInstance.get<SimpleOrigin[]>('origins')

    const originsRecord = Object.fromEntries(origins.map(o => [o.id, o]))

    set({ origins, originsRecord })
  },
}))
