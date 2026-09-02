import './GlobalConfigButton.css'
import type { FocusEventHandler } from 'react'
import { useGlobalConfigStore } from '@/shared/store/useGlobalConfig.store'
import { Button, Dropdown, Field, Input, type ButtonProps } from '..'

type GlobalConfigButtonProps = Pick<ButtonProps, 'size'>

export const GlobalConfigButton = ({ size }: GlobalConfigButtonProps) => {
  const apiUrl = useGlobalConfigStore(s => s.apiUrl)
  const setApiUrl = useGlobalConfigStore(s => s.setApiUrl)

  const handleSetApiUrl: FocusEventHandler<HTMLInputElement> = e =>
    setApiUrl(e.target.value)

  return (
    <Dropdown
      opener={attrs => (
        <Button
          handlingClass="cmp-global-config-button"
          title="Abrir configuración global"
          iconClass="ti ti-world-cog"
          htmlAttrs={attrs}
          {...{ size }}
        />
      )}
    >
      <Field label="API URL" iconClass="ti ti-plug-connected">
        <Input
          size="m"
          htmlAttrs={{ defaultValue: apiUrl, onBlur: handleSetApiUrl }}
        />
      </Field>
    </Dropdown>
  )
}
