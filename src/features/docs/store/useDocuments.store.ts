import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { SimpleDocument } from '../document.types'
import type { ProcurementType } from '@/features/procurements/procurement.types'
import { toast } from 'sonner'
import { PROCUREMENT_TYPE_INFO } from '@/features/procurements/procurement.const'
import { useSelectedDocumentStore } from './useSelectedDocument.store'

interface DocumentsStore {
  documents?: SimpleDocument[]
  documentsRecord?: Record<number, SimpleDocument>
  refetchDocuments: () => Promise<void>
  syncDocumentsRecord: () => void
  toggleProcurementType: (
    id: number,
    type: ProcurementType,
    isActive: boolean,
  ) => Promise<void>
  addDocumentControl: (documentId: number, id: number) => void
}

export const useDocumentsStore = create<DocumentsStore>((set, get) => ({
  refetchDocuments: async () => {
    const { data: documents } =
      await privateInstance.get<SimpleDocument[]>('documents')

    set({ documents })
    get().syncDocumentsRecord()
  },

  syncDocumentsRecord: () => {
    const { documents } = get()
    if (!documents) return

    const documentsRecord = Object.fromEntries(documents.map(o => [o.id, o]))
    set({ documentsRecord })
  },

  toggleProcurementType: async (id, type, isActive) => {
    if (!type) return

    const { documents: prevDocuments } = get()
    if (!prevDocuments) return

    // TODO: controlar si falla
    const { data: procurementTypes } = await privateInstance.patch<
      SimpleDocument['procurementTypes']
    >(`documents/${id}/toggle-procurement-type`, {
      procurementType: type,
    })

    const documents = prevDocuments.map(d =>
      d.id === id ? { ...d, procurementTypes } : d,
    )

    set({ documents })
    get().syncDocumentsRecord()
    useSelectedDocumentStore
      .getState()
      .updateProcurementTypes(id, procurementTypes)

    let msg = isActive ? 'Será incluido' : 'Quedará excluido'
    msg += ` este documento en el tipo "${PROCUREMENT_TYPE_INFO[type]}"`

    if (isActive) toast.success(msg)
    else toast.info(msg)
  },

  addDocumentControl: (documentId, id) => {
    const prevDocuments = get().documents
    if (!prevDocuments) return

    const documents = prevDocuments.map(d =>
      d.id === documentId ? { ...d, controls: [...d.controls, id] } : d,
    )

    set({ documents })
    get().syncDocumentsRecord()
  },
}))
