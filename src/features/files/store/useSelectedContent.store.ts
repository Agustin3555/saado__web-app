import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'

type ContentType = 'viewerUrl' | 'text' | 'data'

const fetchers: Record<ContentType, (id: number) => Promise<unknown>> = {
  viewerUrl: async id => {
    const response = await privateInstance.get(`files/${id}/download`, {
      responseType: 'blob',
    })
    const blob = new Blob([response.data], {
      type: 'application/pdf',
    })

    return URL.createObjectURL(blob)
  },
  text: async id => {
    const { data } = await privateInstance.get<{
      content: string | null
    }>(`files/${id}/content`)

    return data.content
  },
  data: async id => {
    const { data } = await privateInstance.get<{
      data: unknown
    }>(`files/${id}/data`)

    return data.data
  },
}

interface SelectedContentStore {
  selected: { id: number; type: ContentType }[]
  viewerUrlRecord: Record<number, string | null>
  textRecord: Record<number, string | null>
  dataRecord: Record<number, unknown>

  toggleFile: (id: number, contentType: ContentType) => Promise<void>
  reset: () => void
}

const STORE_KEY_MAP: Record<
  ContentType,
  Extract<
    keyof SelectedContentStore,
    'viewerUrlRecord' | 'textRecord' | 'dataRecord'
  >
> = {
  viewerUrl: 'viewerUrlRecord',
  text: 'textRecord',
  data: 'dataRecord',
}

export const useSelectedContentStore = create<SelectedContentStore>(
  (set, get) => ({
    selected: [],
    viewerUrlRecord: {},
    textRecord: {},
    dataRecord: {},

    toggleFile: async (id, contentType) => {
      const { selected } = get()

      const storeKey = STORE_KEY_MAP[contentType]
      const items = get()[storeKey]

      if (items[id] === undefined) {
        set({ [storeKey]: { ...items, [id]: undefined } })

        const loadContent = fetchers[contentType]
        const content = await loadContent(id)

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
      set({
        selected: [],
        viewerUrlRecord: {},
        textRecord: {},
        dataRecord: {},
      }),
  }),
)
