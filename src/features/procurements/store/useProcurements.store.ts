import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleProcurement } from '../procurement.types'

const createRecord = (procurements: SimpleProcurement[]) =>
  Object.fromEntries(procurements.map(o => [o.id, o]))

interface ProcurementsStore {
  procurements?: SimpleProcurement[]
  procurementsRecord?: Record<number, SimpleProcurement>
  refetchProcurements: () => Promise<void>
  newProcurement: (data: {
    companyId: number
    procurementType: string
    name?: string
    numeroExpediente: string
  }) => Promise<void>
  // deleteProcurement: (procurementId: number) => Promise<void>
}

export const useProcurementsStore = create<ProcurementsStore>((set, get) => ({
  refetchProcurements: async () => {
    const { data: procurements } =
      await privateInstance.get<SimpleProcurement[]>('procurements')

    set({ procurements, procurementsRecord: createRecord(procurements) })
  },

  newProcurement: async data => {
    const { data: newProcurement } =
      await privateInstance.post<SimpleProcurement>('procurements', data)

    const prevProcurements = get().procurements
    if (!prevProcurements) return

    const procurements = [newProcurement, ...prevProcurements]

    set({ procurements, procurementsRecord: createRecord(procurements) })
  },
}))
