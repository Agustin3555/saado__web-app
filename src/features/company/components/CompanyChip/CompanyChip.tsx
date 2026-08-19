import { useCompaniesStore } from '../../store/useCompanies.store'
import { Chip } from '@/shared/components'

interface CompanyChip {
  id?: number | null
}

export const CompanyChip = ({ id }: CompanyChip) => {
  const companiesRecord = useCompaniesStore(s => s.companiesRecord)!

  if (!id) return null

  return (
    <Chip
      title="Empresa"
      iconClass="ti ti-building"
      value={companiesRecord[id].name}
    />
  )
}
