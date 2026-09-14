import './Chip.css'
import type { ReactNode } from 'react'
import { Icon } from '..'
import { classList } from '@/shared/helpers'

export interface ChipProps {
  handlingClass?: string
  label: string
  value: number | string
  iconClass?: string
  type?: 'pill' | 'detail'
  clip?: boolean
  children?: ReactNode
}

export const Chip = ({
  handlingClass,
  label,
  value,
  iconClass,
  clip = false,
  children,
  type = 'pill',
}: ChipProps) => {
  return (
    <div
      className={classList('cmp-chip', 'ui-s', type, handlingClass, { clip })}
      title={`${label}: ${value}`}
    >
      {type === 'detail' ? (
        <p className="label">{label}:</p>
      ) : (
        iconClass && <Icon {...{ iconClass }} />
      )}
      {children ? children : <p>{value}</p>}
    </div>
  )
}
