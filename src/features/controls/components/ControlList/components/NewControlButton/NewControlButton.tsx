import './NewControlButton.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useControlsStore } from '../../../../store/useControls.store'
import {
  Banner,
  Button,
  Field,
  Input,
  Modal,
  TextArea,
} from '@/shared/components'
import { toast } from 'sonner'

// TODO: fusionar en un Upset con EditControlButton
export const NewControlButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const newControl = useControlsStore(s => s.newControl)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        name: formValues.get.string('name')!,
        description: formValues.get.string('description'),
      }

      await newControl(data)

      modal.close()
      toast.success('Control creado con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <button
          className="cmp-new-control-button hover-highlight"
          title="Crear un nuevo control"
          type="button"
          {...attrs}
        >
          <Banner text="Nuevo control" iconClass="ti ti-square-rounded-plus" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Nuevo control</h1>
        <div className="fields">
          <Field label="Nombre">
            <Input htmlAttrs={{ name: 'name', required: true }} />
          </Field>
          <Field label="Descripción">
            <TextArea htmlAttrs={{ name: 'description' }} />
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
