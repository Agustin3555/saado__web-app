import type { SimpleDocument } from '../docs/document.types'

export type VerdictType = 'REJECTED' | 'UNCERTAIN' | 'APPROVED'

export interface SimpleFile {
  id: number
}

export interface File extends SimpleFile {
  obraId: number
  document: SimpleDocument

  path: string | null
  verdict: VerdictType | null
  createdAt: string
  updatedAt: string
}
