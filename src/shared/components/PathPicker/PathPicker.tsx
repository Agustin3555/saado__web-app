import './PathPicker.css'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { classList } from '../../helpers'

interface PathPickerProps {
  handlingClass?: string
  name: string
  pick?: 'folder' | 'file'
  size?: 'm' | 'l'
  defaultValue?: string
  defaultPath?: string
  required?: boolean
}

export const PathPicker = ({
  handlingClass,
  name,
  pick = 'folder',
  size = 'l',
  defaultValue,
  defaultPath,
  required = false,
}: PathPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const form = input.form ?? input.closest('form')
    if (!form || !input) return

    const onFormReset = () => {
      setTimeout(() => setValue(input.value), 0)
    }

    form.addEventListener('reset', onFormReset)

    return () => form.removeEventListener('reset', onFormReset)
  }, [])

  const handleSelectPath = async () => {
    const input = inputRef.current
    if (!input) return

    const path = await window.api.invoke('file/select', { pick, defaultPath })
    if (!path) return

    input.value = path
    setValue(path)
  }

  return (
    <div
      className={classList('cmp-path-picker', `ui-${size}`, handlingClass)}
      title={value}
    >
      <Button
        iconClass={`ti ti-${pick}-search`}
        type="secondary"
        onAction={handleSelectPath}
      />
      <input
        ref={inputRef}
        onChange={e => setValue(e.target.value)}
        {...{ name, required, defaultValue }}
      />
    </div>
  )
}
