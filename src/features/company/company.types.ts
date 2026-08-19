export interface SimpleCompany {
  id: number
  name: string
}

export interface Company extends SimpleCompany {
  createdByUserId: number
  updatedByUserId: number
  email: string | null
  createdAt: string
  updatedAt: string
}
