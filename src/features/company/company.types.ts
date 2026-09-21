export interface SimpleCompany {
  id: number
  name: string
}

export interface Company extends SimpleCompany {
  email: string | null
  createdAt: string
  updatedAt: string
}
