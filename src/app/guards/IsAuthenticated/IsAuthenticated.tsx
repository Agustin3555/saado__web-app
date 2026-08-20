import { type ReactNode } from 'react'
import { useAuthStore } from '@/shared/store/useAuth.store'
import { Redirect } from 'wouter'

interface IsAuthenticatedProps {
  children: ReactNode
}

export const IsAuthenticated = ({ children }: IsAuthenticatedProps) => {
  const token = useAuthStore(s => s.token)

  return token ? children : <Redirect to="~/login" />
}
