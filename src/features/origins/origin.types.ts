export interface SimpleOrigin {
  id: number
  name: string
}

export interface Origin extends SimpleOrigin {
  createdAt: string
  updatedAt: string
}
