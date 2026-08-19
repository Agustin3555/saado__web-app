export interface SimpleUser {
  id: number
  lastName: string | null
  firstName: string | null
}

export interface User extends SimpleUser {
  createdAt: string
  updatedAt: string
}
