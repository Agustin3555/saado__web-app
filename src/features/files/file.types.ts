import type { SimpleDocument } from '../docs/document.types'

// FIXME: algunos componentes no reconocen UNDEFINED
export type VerdictType = 'UNDEFINED' | 'REJECTED' | 'UNCERTAIN' | 'APPROVED'

export interface SimpleFile {
  id: number
}

export interface FileControl {
  id: number
  controlId: number

  verdict: VerdictType
  verdictCommentary: string | null
}

export interface File extends SimpleFile {
  procurementId: number
  document: SimpleDocument

  path: string | null
  verdict: VerdictType
  verdictCommentary: string | null
  createdAt: string
  updatedAt: string

  fileControls: FileControl[]
}
