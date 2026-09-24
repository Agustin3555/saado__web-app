import { useControlsStore } from '@/features/controls/store/useControls.store'
import { Field, Input, TextArea } from '@/shared/components'
import { UpsertButton, type UpsertButtonProps } from '@/shared/layouts'
import type { Control } from '@/features/controls/control.types'

interface UpsertControlButtonProps extends Pick<UpsertButtonProps, 'action'> {
  currentData?: Pick<Control, 'id' | 'name' | 'description'>
}

export const UpsertControlButton = ({
  action,
  currentData,
}: UpsertControlButtonProps) => {
  const { id, name, description } = currentData ?? {}

  const newControl = useControlsStore(s => s.newControl)
  const editControl = useControlsStore(s => s.editControl)

  const handleSubmit: UpsertButtonProps['onSubmit'] = async formValues => {
    if (action === 'NEW') {
      const data = {
        name: formValues.get.string('name')!,
        description: formValues.get.string('description'),
      }

      await newControl(data)
    } else {
      if (!id) return

      const data = {
        name: formValues.get.string('name'),
        description: formValues.get.string('description'),
      }

      await editControl(id, data)
    }
  }

  return (
    <UpsertButton
      resourceName={{ name: 'Control' }}
      onSubmit={handleSubmit}
      {...{ action }}
    >
      <Field label="Nombre">
        <Input
          htmlAttrs={{
            name: 'name',
            required: action === 'NEW',
            ...(name && { defaultValue: String(name) }),
          }}
        />
      </Field>
      <Field label="Descripción">
        <TextArea
          htmlAttrs={{
            name: 'description',
            ...(description && { defaultValue: String(description) }),
          }}
        />
      </Field>
    </UpsertButton>
  )
}
