import { useControlsStore } from '../../store/useControls.store'
import { useSelectedDocumentStore } from '@/features/docs/store/useSelectedDocument.store'
import { Field, Select } from '@/shared/components'
import type { RelDocumentControl } from '@/features/docs/document.types'
import type { ProcurementType } from '@/features/procurements/procurement.types'
import { UpsertButton, type UpsertButtonProps } from '@/shared/layouts'

interface UpsertControlButtonProps extends Pick<UpsertButtonProps, 'action'> {
  procurementType: ProcurementType | null
  data?: Pick<RelDocumentControl, 'id' | 'controlId' | 'verifierId'>
}

export const UpsertControlButton = ({
  action,
  procurementType,
  data,
}: UpsertControlButtonProps) => {
  const { id, controlId, verifierId } = data ?? {}

  const controls = useControlsStore(s => s.controls)!

  const createDocumentControl = useSelectedDocumentStore(
    s => s.createDocumentControl,
  )

  const updateDocumentControl = useSelectedDocumentStore(
    s => s.updateDocumentControl,
  )

  const controlsOptions = controls.map(({ id, name }) => ({
    value: String(id),
    label: name,
  }))

  const handleSubmit: UpsertButtonProps['onSubmit'] = async formValues => {
    if (action === 'NEW') {
      const data = {
        controlId: formValues.get.number('controlId')!,
        verifierId: formValues.get.number('verifierId'),
        procurementType,
      }

      await createDocumentControl(data)
    } else {
      if (!id) return

      const data = {
        // FIXME: si bien controlId no es requerido, no se puede mandar null
        controlId: formValues.get.number('controlId'),
        verifierId: formValues.get.number('verifierId'),
      }

      await updateDocumentControl(id, data)
    }
  }

  return (
    <UpsertButton
      resourceName={{ name: 'Relación', gender: 'female' }}
      onSubmit={handleSubmit}
      {...{ action }}
    >
      <Field label="Control">
        <Select
          key={String(controlId)}
          options={controlsOptions}
          htmlAttrs={{
            name: 'controlId',
            required: action === 'NEW',
            ...(controlId && { defaultValue: String(controlId) }),
          }}
        />
      </Field>
      <Field label="Verificador">
        <Select
          key={String(verifierId)}
          htmlAttrs={{
            name: 'verifierId',
            ...(verifierId && { defaultValue: String(verifierId) }),
          }}
        />
      </Field>
    </UpsertButton>
  )
}
