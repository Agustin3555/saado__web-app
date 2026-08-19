export interface SimpleFile {
  id: number
}

export interface File extends SimpleFile {
  obraId: number
  documentId: number

  path: string | null
  createdAt: string
  updatedAt: string
}
