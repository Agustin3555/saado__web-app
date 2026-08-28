import './Select.css'
import type { SelectHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import { classList } from '@/shared/helpers'

export interface SelectProps {
  options?: { value: string; label: string }[]
  size?: 'm' | 'l'
  htmlAttrs?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select = ({ options, size = 'l', htmlAttrs }: SelectProps) => {
  return (
    <select className={classList('cmp-select', `ui-${size}`)} {...htmlAttrs}>
      <button>
        <selectedcontent></selectedcontent>
        <Icon iconClass="ti ti-chevron-down" />
      </button>
      <option className="ui-m">-</option>
      {options?.map(({ value, label }) => (
        <option key={value} className="ui-m" {...{ value }}>
          {label}
        </option>
      ))}
    </select>
  )
}
