import { useProcurementsStore } from '../../store/useProcurements.store'
import { Field, Input, Select } from '@/shared/components'
import { CompanySelect } from '@/features/companies/components/CompanySelect/CompanySelect'
import { PROCUREMENT_TYPE_OPTIONS } from '../../procurement.const'
import { UpsertButton, type UpsertButtonProps } from '@/shared/layouts'

interface ProcurementUpsertButtonProps extends Pick<
  UpsertButtonProps,
  'action'
> {}

export const ProcurementUpsertButton = ({
  action,
}: ProcurementUpsertButtonProps) => {
  const newProcurement = useProcurementsStore(s => s.newProcurement)

  const handleSubmit: UpsertButtonProps['onSubmit'] = async formValues => {
    if (action === 'NEW') {
      const data = {
        companyId: formValues.get.number('companyId')!,
        procurementType: formValues.get.string('procurementType')!,
        name: formValues.get.string('name'),
        numeroExpediente: formValues.get.string('numeroExpediente')!,
      }

      // TODO: capturar el error de unicidad de name
      await newProcurement(data)
    }
  }

  return (
    <UpsertButton
      resourceName={{ name: 'Contratación', gender: 'female' }}
      onSubmit={handleSubmit}
      {...{ action }}
    >
      <Field label="Número de expediente">
        <Input
          htmlAttrs={{ name: 'numeroExpediente', required: action === 'NEW' }}
        />
      </Field>
      <Field label="Tipo de contratación">
        <Select
          options={PROCUREMENT_TYPE_OPTIONS}
          htmlAttrs={{ name: 'procurementType', required: action === 'NEW' }}
        />
      </Field>
      <Field label="Empresa">
        <CompanySelect />
      </Field>
      <Field label="Nombre">
        <Input htmlAttrs={{ name: 'name' }} />
      </Field>
    </UpsertButton>
  )
}
