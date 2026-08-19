import { publicInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleCompany } from '../company.types'

interface CompaniesStore {
  companies?: SimpleCompany[]
  companiesRecord?: Record<number, SimpleCompany>
  refetchCompanies: () => Promise<void>
}

export const useCompaniesStore = create<CompaniesStore>(set => ({
  refetchCompanies: async () => {
    const { data: companies } =
      await publicInstance.get<SimpleCompany[]>('companies')

    const companiesRecord = Object.fromEntries(companies.map(o => [o.id, o]))

    set({ companies, companiesRecord })
  },
}))
