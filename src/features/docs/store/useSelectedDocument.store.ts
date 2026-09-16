import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Document, RelDocumentControl } from '../document.types'
import type { SimpleDocument } from '../document.types'
import type { ProcurementType } from '@/features/procurements/procurement.types'
import { useDocumentsStore } from './useDocuments.store'

interface SelectedDocumentStore {
  selectedDocument?: Document
  refetchSelectedDocument: (documentId?: number) => Promise<void>
  updateProcurementTypes: (
    documentId: number,
    procurementTypes: SimpleDocument['procurementTypes'],
  ) => void
  createDocumentControl: (data: {
    controlId: number
    verifierId?: number
    procurementType: ProcurementType | null
  }) => Promise<void>
  updateDocumentControl: (
    id: number,
    data: {
      controlId?: number
      verifierId?: number
    },
  ) => Promise<void>
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

    createDocumentControl: async ({
      controlId,
      verifierId,
      procurementType,
    }) => {
      const prevSelectedDocument = get().selectedDocument
      if (!prevSelectedDocument) return

      const data = {
        documentId: prevSelectedDocument.id,
        controlId,
        verifierId,
        procurementType,
      }

      const { data: newDocumentControl } =
        await privateInstance.post<RelDocumentControl>(
          'documents/controls',
          data,
        )

      const { controls: prevControls, ...rest } = prevSelectedDocument

      const controls = [...prevControls, newDocumentControl]
      const selectedDocument = { ...rest, controls }

      set({ selectedDocument })

      useDocumentsStore
        .getState()
        .addDocumentControl(selectedDocument.id, newDocumentControl.id)
      // TODO: actualizar también desde useControlsStore, para mostrar la cantidad de documentos actualizado
    },

    updateDocumentControl: async (id, { controlId, verifierId }) => {
      const prevSelectedDocument = get().selectedDocument
      if (!prevSelectedDocument) return

      const data = { controlId, verifierId }

      const { data: updatedDocumentControl } =
        await privateInstance.patch<RelDocumentControl>(
          `documents/controls/${id}`,
          data,
        )

      const { controls: prevControls, ...rest } = prevSelectedDocument

      const selectedDocument = {
        ...rest,
        controls: prevControls.map(c =>
          c.id === id ? updatedDocumentControl : c,
        ),
      }

      set({ selectedDocument })
    },
  }),
)
