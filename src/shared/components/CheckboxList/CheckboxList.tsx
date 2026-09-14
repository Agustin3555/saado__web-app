import './CheckboxList.css'
import type { ChangeEventHandler } from 'react'
import { Checker } from '..'
import { classList } from '@/shared/helpers'

export interface CheckboxListProps {
  name: string
  options?: { value: string; label: string }[]
  size?: 'm' | 'l'
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const CheckboxList = ({
  name,
  options,
  size = 'm',
  onChange,
}: CheckboxListProps) => {
  return (
    <fieldset className={classList('cmp-checkbox-list', `ui-${size}`)}>
      {options?.map(({ value, label }) => (
        <label key={value}>
          <input type="checkbox" hidden {...{ name, value, onChange }} />
          <Checker {...{ size }} />
          {label}
        </label>
      ))}
    </fieldset>
  )
}
