import './Chip.css'
import type { ReactNode } from 'react'
import { Icon } from '..'
import { classList } from '@/shared/helpers'

export interface ChipProps {
  handlingClass?: string
  title?: string
  iconClass?: string
  clip?: boolean
  children?: ReactNode
}

export const Chip = ({
  handlingClass,
  title,
  iconClass,
  clip = false,
  children,
}: ChipProps) => {
  return (
    <div
      className={classList('cmp-chip', 'ui-s', handlingClass, { clip })}
      {...{ title }}
    >
      {iconClass && <Icon {...{ iconClass }} />}
      {children}
    </div>
  )
}
