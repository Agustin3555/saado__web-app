import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useObrasStore } from '../../store/useObras.store'
import { Button, Field, Icon, Input, Modal } from '@/shared/components'
import { toast } from 'sonner'

export const NewObraButton = () => {
  const newObra = useObrasStore(s => s.newObra)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      const data = {
        companyId: formValues.get.number('companyId')!,
        name: formValues.get.string('name'),
        numeroExpediente: formValues.get.string('numeroExpediente')!,
      }

      await newObra(data)
      toast.success('Obra creada con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
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
            <Input htmlAttrs={{ name: 'coordinator', required: true }} />
          </Field>
          <Field label="Empresa">{/* Select de companies */}</Field>
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
