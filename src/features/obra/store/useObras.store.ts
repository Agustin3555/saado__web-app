import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleObra } from '../obra.types'

interface ObrasStore {
  obras?: SimpleObra[]
  obrasRecord?: Record<number, SimpleObra>
  refetchObras: () => Promise<void>
  newObra: (data: {
    companyId: number
    name?: string
    numeroExpediente: string
  }) => Promise<void>
  // deleteObra: (obraId: number) => Promise<void>
}

export const useObrasStore = create<ObrasStore>((set, get) => ({
  refetchObras: async () => {
    const { data: obras } = await privateInstance.get<SimpleObra[]>('obras')

    const obrasRecord = Object.fromEntries(obras.map(o => [o.id, o]))

    set({ obras, obrasRecord })
  },

  newObra: async data => {
    await privateInstance.post<SimpleObra>('obras', data)

    await get().refetchObras()
  },
}))
