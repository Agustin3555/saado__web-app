import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Obra } from '../obra.types'

interface SelectedObraStore {
  selectedObra?: Obra
  refetchSelectedObra: (obraId?: number) => Promise<void>
}

export const useSelectedObraStore = create<SelectedObraStore>((set, get) => ({
  refetchSelectedObra: async obraId => {
    if (obraId !== undefined) set({ selectedObra: undefined })

    const currentSelectedObra = get().selectedObra
    const id = obraId === undefined ? currentSelectedObra?.id : obraId

    const { data: selectedObra } = await privateInstance.get<Obra>(
      `obras/${id}`,
    )

    set({ selectedObra })
  },
}))
