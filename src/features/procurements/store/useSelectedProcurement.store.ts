import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Procurement } from '../procurement.types'

interface SelectedProcurementStore {
  selectedProcurement?: Procurement
  refetchSelectedProcurement: (procurementId?: number) => Promise<void>
}

export const useSelectedProcurementStore = create<SelectedProcurementStore>(
  (set, get) => ({
    refetchSelectedProcurement: async procurementId => {
      if (procurementId !== undefined) set({ selectedProcurement: undefined })

      const currentSelectedProcurement = get().selectedProcurement
      const id =
        procurementId === undefined
          ? currentSelectedProcurement?.id
          : procurementId

      const { data: selectedProcurement } =
        await privateInstance.get<Procurement>(`procurements/${id}`)

      set({ selectedProcurement })
    },
  }),
)
