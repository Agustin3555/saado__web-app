import { type ReactNode } from 'react'
import { Redirect } from 'wouter'

interface IsAuthenticatedProps {
  children: ReactNode
}

export const IsAuthenticated = ({ children }: IsAuthenticatedProps) => {
  const hasAccess = true

  if (!hasAccess) return <Redirect to="/login" />

  return children
}
