import './NewProcurementButton.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useProcurementsStore } from '../../store/useProcurements.store'
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
import { PROCUREMENT_TYPE_INFO } from '../../procurement.const'
import { toast } from 'sonner'

const procurementTypeOptions: SelectProps['options'] = Object.entries(
  PROCUREMENT_TYPE_INFO,
).map(([key, value]) => ({ value: key, label: value }))

export const NewProcurementButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const newProcurement = useProcurementsStore(s => s.newProcurement)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        companyId: formValues.get.number('companyId')!,
        procurementType: formValues.get.string('procurementType')!,
        name: formValues.get.string('name'),
        numeroExpediente: formValues.get.string('numeroExpediente')!,
      }

      // TODO: capturar el error de unicidad de name
      await newProcurement(data)

      modal.close()
      toast.success('Contratación creada con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <button
          className="cmp-new-procurement-button hover-highlight"
          title="Crear una nueva contratación"
          type="button"
          {...attrs}
        >
          <Banner
            text="Nueva contratación"
            iconClass="ti ti-square-rounded-plus"
          />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Nueva procurement</h1>
        <div className="fields">
          <Field label="Número de expediente">
            <Input htmlAttrs={{ name: 'numeroExpediente', required: true }} />
          </Field>
          <Field label="Tipo de contratación">
            <Select
              options={procurementTypeOptions}
              htmlAttrs={{ name: 'procurementType', required: true }}
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
