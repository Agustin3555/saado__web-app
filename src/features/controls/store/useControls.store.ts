import { privateInstance } from '@/infra/http/axios/instances'
import { create } from 'zustand'
import type { Control } from '../control.types'

interface ControlsStore {
  controls?: Control[]
  controlsRecord?: Record<number, Control>
  refetchControls: () => Promise<void>
  syncControlsRecord: () => void
  newControl: (data: { name: string; description?: string }) => Promise<void>
  editControl: (
    id: number,
    data: { name?: string; description?: string },
  ) => Promise<void>
}

export const useControlsStore = create<ControlsStore>((set, get) => ({
  refetchControls: async () => {
    const { data: controls } = await privateInstance.get<Control[]>('controls')

    set({ controls })
    get().syncControlsRecord()
  },

  syncControlsRecord: () => {
    const { controls } = get()
    if (!controls) return

    const controlsRecord = Object.fromEntries(controls.map(o => [o.id, o]))
    set({ controlsRecord })
  },

  newControl: async data => {
    const { data: newControl } = await privateInstance.post<Control>(
      'controls',
      data,
    )

    const prevControls = get().controls

    const controls = prevControls ? [newControl, ...prevControls] : [newControl]

    set({ controls })
    get().syncControlsRecord()
  },

  editControl: async (id, data) => {
    const { data: updatedControl } = await privateInstance.patch<Control>(
      `controls/${id}`,
      data,
    )

    const prevControls = get().controls
    if (!prevControls) return

    const controls = prevControls.map(c => (c.id === id ? updatedControl : c))

    set({ controls })
    get().syncControlsRecord()
  },
}))
