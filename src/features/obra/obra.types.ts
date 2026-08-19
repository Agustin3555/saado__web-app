import type { File } from '../files/file.types'

export interface SimpleObra {
  id: number
  companyId: number | null
  name: string | null
  numeroExpediente: string | null
  updatedAt: string
}

export interface Obra extends SimpleObra {
  createdByUserId: number
  updatedByUserId: number
  createdAt: string
  files: File[]
}
