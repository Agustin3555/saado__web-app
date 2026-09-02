import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalConfigStore {
  apiUrl: string
  setApiUrl: (apiUrl: string) => void
}

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    set => ({
      apiUrl: 'http://localhost:3000',

      setApiUrl: apiUrl =>
        set(s => {
          if (s.apiUrl === apiUrl) return s

          toast.success('Configuración actualizada con éxito')
          return { apiUrl }
        }),
    }),
    { name: 'global-config-storage' },
  ),
)
