import axios from 'axios'
import { create } from 'zustand'

export interface Obra {
  id: number
  companyId: number
  name?: string
  numeroExpediente: string
  updatedAt: string
}

interface ProjectStore {
  obras?: Obra[]
  obrasRecord?: Record<number, Obra>
  refetchObras: () => Promise<void>
  newObra: (data: {
    companyId: number
    name?: string
    numeroExpediente: string
  }) => Promise<void>
  // deleteObra: (obraId: number) => Promise<void>
}

export const useObrasStore = create<ProjectStore>((set, get) => ({
  refetchObras: async () => {
    const { data: obras } = await axios.get<Obra[]>(
      'http://localhost:3000/v1/obras',
    )

    const obrasRecord = Object.fromEntries(obras.map(o => [o.id, o]))

    set({ obras, obrasRecord })
  },

  newObra: async data => {
    await axios.post<Obra>('http://localhost:3000/v1/obras', data)

    await get().refetchObras()
  },
}))
