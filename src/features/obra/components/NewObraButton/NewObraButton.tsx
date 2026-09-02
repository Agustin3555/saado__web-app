import './NewObraButton.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useObrasStore } from '../../store/useObras.store'
import {
  Banner,
  Button,
  Field,
  Input,
  Modal,
  Select,
  type SelectProps,
} from '@/shared/components'
import { CompanySelect } from '@/features/company/components/CompanySelect/CompanySelect'
import { TIPO_CONTRATACION_INFO } from '../../obra.const'
import { toast } from 'sonner'

const tipoContratacionOptions: SelectProps['options'] = Object.entries(
  TIPO_CONTRATACION_INFO,
).map(([key, value]) => ({ value: key, label: value }))

export const NewObraButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const newObra = useObrasStore(s => s.newObra)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        companyId: formValues.get.number('companyId')!,
        tipoContratacion: formValues.get.number('tipoContratacion')!,
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
          className="cmp-new-obra-button hover-highlight"
          title="Crear una nueva obra"
          type="button"
          {...attrs}
        >
          <Banner text="Nueva obra" iconClass="ti ti-square-rounded-plus" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Nueva obra</h1>
        <div className="fields">
          <Field label="Número de expediente">
            <Input htmlAttrs={{ name: 'numeroExpediente', required: true }} />
          </Field>
          <Field label="Tipo de contratación">
            <Select
              options={tipoContratacionOptions}
              htmlAttrs={{ name: 'tipoContratacion', required: true }}
            />
          </Field>
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
