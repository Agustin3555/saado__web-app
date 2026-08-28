import './JoinChips.css'
import { type ReactNode } from 'react'
import { classList } from '@/shared/helpers'

interface JoinChipsProps {
  handlingClass?: string
  title?: string
  children: ReactNode[]
}

export const JoinChips = ({
  handlingClass,
  title,
  children,
}: JoinChipsProps) => {
  return (
    <div className={classList('cmp-join-chips', handlingClass)} {...{ title }}>
      {children}
    </div>
  )
}
