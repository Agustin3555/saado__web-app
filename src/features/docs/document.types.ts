export interface SimpleDocument {
  id: number
  originId?: number

  name?: string
}

export interface Document extends SimpleDocument {
  createdAt: string
  updatedAt: string
}
