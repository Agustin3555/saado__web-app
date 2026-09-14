import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Document } from '../document.types'
import type { SimpleDocument } from '../document.types'

interface SelectedDocumentStore {
  selectedDocument?: Document
  refetchSelectedDocument: (documentId?: number) => Promise<void>
  updateProcurementTypes: (
    documentId: number,
    procurementTypes: SimpleDocument['procurementTypes'],
  ) => void
}

export const useSelectedDocumentStore = create<SelectedDocumentStore>(
  (set, get) => ({
    refetchSelectedDocument: async documentId => {
      if (documentId !== undefined) set({ selectedDocument: undefined })

      const currentSelectedDocument = get().selectedDocument
      const id =
        documentId === undefined ? currentSelectedDocument?.id : documentId

      const { data: selectedDocument } = await privateInstance.get<Document>(
        `documents/${id}`,
      )

      set({ selectedDocument })
    },

    updateProcurementTypes: (documentId, procurementTypes) => {
      const { selectedDocument } = get()
      if (selectedDocument?.id !== documentId) return

      set({ selectedDocument: { ...selectedDocument, procurementTypes } })
    },
  }),
)
