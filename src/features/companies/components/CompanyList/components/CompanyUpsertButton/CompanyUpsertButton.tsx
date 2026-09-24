import { useCompaniesStore } from '@/features/companies/store/useCompanies.store'
import { Field, Input } from '@/shared/components'
import { UpsertButton, type UpsertButtonProps } from '@/shared/layouts'
import type { Company } from '@/features/companies/company.types'

interface CompanyUpsertButtonProps extends Pick<UpsertButtonProps, 'action'> {
  currentData?: Pick<Company, 'id' | 'name' | 'email'>
}

export const CompanyUpsertButton = ({
  action,
  currentData,
}: CompanyUpsertButtonProps) => {
  const { id, name, email } = currentData ?? {}

  const newCompany = useCompaniesStore(s => s.newCompany)
  const editCompany = useCompaniesStore(s => s.editCompany)

  const handleSubmit: UpsertButtonProps['onSubmit'] = async formValues => {
    if (action === 'NEW') {
      const data = {
        name: formValues.get.string('name')!,
        email: formValues.get.string('email'),
      }

      await newCompany(data)
    } else {
      if (!id) return

      const data = {
        name: formValues.get.string('name'),
        email: formValues.get.string('email'),
      }

      await editCompany(id, data)
    }
  }

  return (
    <UpsertButton
      resourceName={{ name: 'Empresa', gender: 'female' }}
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
      <Field label="Email">
        <Input
          htmlAttrs={{
            name: 'email',
            type: 'email',
            ...(email && { defaultValue: String(email) }),
          }}
        />
      </Field>
    </UpsertButton>
  )
}
