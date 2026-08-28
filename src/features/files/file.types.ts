import type { SimpleDocument } from '../docs/document.types'

export interface SimpleFile {
  id: number
}

export interface File extends SimpleFile {
  obraId: number
  document: SimpleDocument

  path: string | null
  createdAt: string
  updatedAt: string
}
