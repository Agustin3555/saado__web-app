export interface CompanyRef {
  id: number
  name: string
}

export type Company = CompanyRef &
  Partial<{
    email: string | null
    createdAt: string
    updatedAt: string

    _count: {
      procurements: number
    }
  }>
