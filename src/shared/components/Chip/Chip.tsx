import './Chip.css'
import type { ReactNode } from 'react'
import { Icon } from '..'
import { classList } from '@/shared/helpers'

export interface ChipProps {
  handlingClass?: string
  title: string
  iconClass: string
  value?: string | number
  children?: ReactNode
}

export const Chip = ({
  handlingClass,
  title,
  iconClass,
  value,
  children,
}: ChipProps) => {
  return (
    <li className={classList('cmp-chip', 'ui-s', handlingClass)} {...{ title }}>
      <Icon {...{ iconClass }} />
      <span>{value}</span>
      {children}
    </li>
  )
}
