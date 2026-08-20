import { type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/shared/store/useAuth.store'

export const addToken = async (config: InternalAxiosRequestConfig) => {
  const { token } = useAuthStore.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}
