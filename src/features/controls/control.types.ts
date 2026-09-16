export interface Control {
  id: number

  name: string
  description: string | null
  updatedAt: string
  createdAt: string

  documents: unknown[]
}
