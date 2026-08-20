import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'

type ContentType = 'preview' | 'extractedText'

interface SelectedContentStore {
  selected: { id: number; type: ContentType }[]
  previewItems: Record<number, undefined | string | null>
  extractedTextItems: Record<number, undefined | string | null>
  toggleFile: (id: number, contentType: ContentType) => Promise<void>
  reset: () => void
}

export const useSelectedContentStore = create<SelectedContentStore>(
  (set, get) => ({
    selected: [],
    previewItems: {},
    extractedTextItems: {},

    toggleFile: async (id, contentType) => {
      const { selected } = get()
      const storeKey =
        contentType === 'extractedText' ? 'extractedTextItems' : 'previewItems'
      const items = get()[storeKey]

      if (items[id] === undefined) {
        set({ [storeKey]: { ...items, [id]: undefined } })

        let content: string | null

        if (contentType === 'extractedText') {
          const { data } = await privateInstance.get<{
            content: string | null
          }>(`files/${id}/content`)

          content = data.content
        } else {
          const response = await privateInstance.get(`files/${id}/download`, {
            responseType: 'blob',
          })

          const blob = new Blob([response.data], { type: 'application/pdf' })
          content = URL.createObjectURL(blob)
        }

        set({ [storeKey]: { ...get()[storeKey], [id]: content } })
      }

      const selectedExists = selected.find(
        f => f.id === id && f.type === contentType,
      )

      set({
        selected: selectedExists
          ? selected.filter(f => f.id !== id || f.type !== contentType)
          : [...selected, { id, type: contentType }],
      })
    },

    reset: () =>
      set({ selected: [], previewItems: {}, extractedTextItems: {} }),
  }),
)
