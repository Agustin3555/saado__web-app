import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useControlsStore } from '../../store/useControls.store'
import { useSelectedDocumentStore } from '@/features/docs/store/useSelectedDocument.store'
import { Button, Field, Modal, Select } from '@/shared/components'
import { toast } from 'sonner'
import type { RelDocumentControl } from '@/features/docs/document.types'
import type { ProcurementType } from '@/features/procurements/procurement.types'

interface UpsetControlButtonProps {
  procurementType: ProcurementType | null
  action?: 'new' | 'update'
  data?: Pick<RelDocumentControl, 'id' | 'controlId' | 'verifierId'>
}

export const UpsetControlButton = ({
  procurementType,
  action = 'new',
  data,
}: UpsetControlButtonProps) => {
  const { id, controlId, verifierId } = data ?? {}

  const controls = useControlsStore(s => s.controls)!
  const createDocumentControl = useSelectedDocumentStore(
    s => s.createDocumentControl,
  )
  const updateDocumentControl = useSelectedDocumentStore(
    s => s.updateDocumentControl,
  )
  const modalRef = useRef<HTMLDialogElement>(null)

  const controlsOptions = controls.map(({ id, name }) => ({
    value: String(id),
    label: name,
  }))

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      if (action === 'new') {
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

      modal.close()
      toast.success(
        `Relación ${action === 'new' ? 'creada' : 'editada'} con éxito`,
      )
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs =>
        action === 'new' ? (
          <Button
            text="Nuevo relación"
            iconClass="ti ti-plus"
            type="secondary"
            size="s"
            inverted
            htmlAttrs={attrs}
          />
        ) : (
          <Button
            title="Editar relación"
            iconClass="ti ti-pencil"
            type="primary"
            htmlAttrs={attrs}
          />
        )
      }
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text">
          {action === 'new' ? 'Nuevo' : 'Editar'} relación
        </h1>
        <div className="fields">
          <Field label="Control">
            <Select
              key={String(controlId)}
              options={controlsOptions}
              htmlAttrs={{
                name: 'controlId',
                required: action === 'new',
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
        </div>
        <Button
          text="Confirmar"
          iconClass="ti ti-check"
          type="primary"
          submit
          {...{ actionState }}
        />
      </form>
    </Modal>
  )
}
