import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleDocument } from '../document.types'

interface DocumentsStore {
  documents?: SimpleDocument[]
  documentsRecord?: Record<number, SimpleDocument>
  refetchDocuments: () => Promise<void>
}

export const useDocumentsStore = create<DocumentsStore>(set => ({
  refetchDocuments: async () => {
    const { data: documents } =
      await privateInstance.get<SimpleDocument[]>('documents')

    const documentsRecord = Object.fromEntries(documents.map(o => [o.id, o]))

    set({ documents, documentsRecord })
  },
}))
