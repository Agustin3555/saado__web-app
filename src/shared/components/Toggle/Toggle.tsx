import './Toggle.css'
import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Icon } from '..'
import { classList } from '@/shared/helpers'

type Style = 'toggle' | 'switch'

export interface ToggleProps {
  title: string
  iconClass?: string
  size?: 's' | 'm'
  style?: Style
  value: boolean
  setValue?: Dispatch<SetStateAction<boolean>>
  onChange?: () => void
}

export const Toggle = ({
  title,
  iconClass = 'fa-solid fa-check',
  size = 's',
  style = 'toggle',
  value: checked,
  setValue,
  onChange,
}: ToggleProps) => {
  const ui: Record<Style, ReactNode> = {
    toggle: (
      <div className="toggle">
        <Icon {...{ iconClass }} />
      </div>
    ),
    switch: (
      <div className="switch">
        <div className="lever">
          <Icon {...{ iconClass }} />
        </div>
      </div>
    ),
  }

  const handleChange = () => {
    setValue?.(prevValue => !prevValue)
    onChange?.()
  }

  return (
    <label className={classList('cmp-toggle', `ui-${size}`)} {...{ title }}>
      <input type="checkbox" onChange={handleChange} {...{ checked }} />
      {ui[style]}
    </label>
  )
}
