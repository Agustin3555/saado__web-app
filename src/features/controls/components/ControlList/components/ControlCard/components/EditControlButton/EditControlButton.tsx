import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useControlsStore } from '@/features/controls/store/useControls.store'
import { Button, Field, Input, Modal, TextArea } from '@/shared/components'
import { toast } from 'sonner'
import type { Control } from '@/features/controls/control.types'

type EditControlButtonProps = Pick<Control, 'id' | 'name' | 'description'>

export const EditControlButton = ({
  id,
  name,
  description,
}: EditControlButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const editControl = useControlsStore(s => s.editControl)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        name: formValues.get.string('name'),
        description: formValues.get.string('description'),
      }

      await editControl(id, data)

      modal.close()
      toast.success('Control editado con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <Button
          handlingClass="cmp-edit-control-button"
          title="Editar este control"
          iconClass="ti ti-pencil"
          size="s"
          type="secondary"
          htmlAttrs={attrs}
        />
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Editar este control</h1>
        <div className="fields">
          <Field label="Nombre">
            <Input htmlAttrs={{ name: 'name', defaultValue: name }} />
          </Field>
          <Field label="Descripción">
            <TextArea
              htmlAttrs={{
                name: 'description',
                defaultValue: description ?? undefined,
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
