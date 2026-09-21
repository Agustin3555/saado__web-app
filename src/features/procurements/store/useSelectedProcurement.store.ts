import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Procurement } from '../procurement.types'
import type { FileControl, VerdictType } from '@/features/files/file.types'
import { toast } from 'sonner'

interface SelectedProcurementStore {
  selectedProcurement?: Procurement
  refetchSelectedProcurement: (procurementId?: number) => Promise<void>
  updateFileControlVerdict: (data: {
    fileId: number
    controlId: number
    verdict: VerdictType
    verdictCommentary?: string
  }) => Promise<void>
  addFileControls: (fileId: number) => Promise<void>
}

export const useSelectedProcurementStore = create<SelectedProcurementStore>(
  (set, get) => ({
    refetchSelectedProcurement: async procurementId => {
      if (procurementId !== undefined) set({ selectedProcurement: undefined })

      const currentSelectedProcurement = get().selectedProcurement
      const id =
        procurementId === undefined
          ? currentSelectedProcurement?.id
          : procurementId

      const { data: selectedProcurement } =
        await privateInstance.get<Procurement>(`procurements/${id}`)

      set({ selectedProcurement })
    },

    updateFileControlVerdict: async ({ fileId, controlId, ...data }) => {
      const { data: newFileControl } = await privateInstance.patch<FileControl>(
        `files/${fileId}/controls/${controlId}`,
        data,
      )

      const prevProcurement = get().selectedProcurement
      if (!prevProcurement) return

      const procurement = {
        ...prevProcurement,
        files: prevProcurement.files.map(f =>
          f.id === fileId
            ? {
                ...f,
                fileControls: f.fileControls.map(fc =>
                  fc.controlId === controlId
                    ? { ...fc, ...newFileControl }
                    : fc,
                ),
              }
            : f,
        ),
      }

      set({ selectedProcurement: procurement })
    },

    addFileControls: async fileId => {
      const {
        data: { added, fileControls },
      } = await privateInstance.post<{
        added: number
        fileControls: FileControl[]
      }>(`files/${fileId}/controls/add`)

      const prevProcurement = get().selectedProcurement
      if (!prevProcurement) return

      const procurement = {
        ...prevProcurement,
        files: prevProcurement.files.map(f =>
          f.id === fileId ? { ...f, fileControls } : f,
        ),
      }

      set({ selectedProcurement: procurement })

      toast.success(
        added
          ? `Controles agregados: ${added}`
          : 'No hay mas controles que agregar',
      )
    },
  }),
)
