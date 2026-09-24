import { create } from 'zustand'
import type { Company } from '../company.types'
import { CompanyServices } from '../company.services'

interface CompaniesStore {
  companies?: Company[]
  companiesRecord?: Record<number, Company>

  refetchCompanies: (type: 'REF' | 'LIST') => Promise<void>
  syncRecord: (companies: Company[]) => void
  newCompany: (data: { name: string; email?: string }) => Promise<void>
  editCompany: (
    id: number,
    data: { name?: string; email?: string },
  ) => Promise<void>
}

export const useCompaniesStore = create<CompaniesStore>((set, get) => ({
  refetchCompanies: async type => {
    const companies = await (type === 'REF'
      ? CompanyServices.getAllRefs()
      : CompanyServices.getAll())

    set({ companies })
    get().syncRecord(companies)
  },

  syncRecord: companies => {
    const companiesRecord = Object.fromEntries(companies.map(c => [c.id, c]))

    set({ companiesRecord })
  },

  newCompany: async data => {
    const newCompany = await CompanyServices.create(data)

    const prevCompanies = get().companies

    const companies = prevCompanies
      ? [newCompany, ...prevCompanies]
      : [newCompany]

    set({ companies })
    get().syncRecord(companies)
  },

  editCompany: async (id, data) => {
    const updatedCompany = await CompanyServices.editOne(id, data)

    const prevCompanies = get().companies
    if (!prevCompanies) return

    const companies = prevCompanies.map(c => (c.id === id ? updatedCompany : c))

    set({ companies })
    get().syncRecord(companies)
  },
}))
