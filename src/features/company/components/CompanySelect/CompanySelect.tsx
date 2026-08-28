import { useCompaniesStore } from '../../store/useCompanies.store'
import { Select, type SelectProps } from '@/shared/components'

export const CompanySelect = () => {
  const companies = useCompaniesStore(s => s.companies)

  const options: SelectProps['options'] = companies?.map(r => ({
    value: String(r.id),
    label: r.name,
  }))

  return (
    <Select
      htmlAttrs={{ name: 'companyId', required: true }}
      {...{ options }}
    />
  )
}
