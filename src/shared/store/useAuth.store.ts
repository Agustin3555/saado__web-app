import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  email: string | null
  login: (credentials: { token: string; email: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      email: null,

      login: credentials => set(credentials),

      logout: () => set({ token: null }),
    }),
    { name: 'auth-storage' },
  ),
)
