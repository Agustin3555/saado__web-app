import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useObrasStore } from '../../store/useObras.store'
import { Button, Field, Icon, Input, Modal } from '@/shared/components'
import { CompanySelect } from '@/features/company/components/CompanySelect/CompanySelect'
import { toast } from 'sonner'

export const NewObraButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const newObra = useObrasStore(s => s.newObra)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        companyId: formValues.get.number('companyId')!,
        name: formValues.get.string('name'),
        numeroExpediente: formValues.get.string('numeroExpediente')!,
      }

      // await newObra(data)
      modal.close()
      toast.success('Obra creada con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <button
          className="new"
          title="Crear una nueva obra"
          type="button"
          {...attrs}
        >
          <Icon iconClass="ti ti-plus" />
          Nuevo obra
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Nueva obra</h1>
        <div className="fields">
          <Field label="Número de expediente">
            <Input htmlAttrs={{ name: 'numeroExpediente', required: true }} />
          </Field>
          {/* TODO */}
          {/* <Field label="Tipo de contratación">
            Select de Tipo de contratación
          </Field> */}
          <Field label="Empresa">
            <CompanySelect />
          </Field>
          <Field label="Nombre">
            <Input htmlAttrs={{ name: 'name' }} />
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
