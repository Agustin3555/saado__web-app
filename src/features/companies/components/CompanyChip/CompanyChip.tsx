import { useCompaniesStore } from '../../store/useCompanies.store'
import { Chip, type ChipProps } from '@/shared/components'

interface CompanyChip extends Pick<ChipProps, 'type'> {
  id?: number | null
}

export const CompanyChip = ({ id, type }: CompanyChip) => {
  const companiesRecord = useCompaniesStore(s => s.companiesRecord)!

  if (!id) return null

  return (
    <Chip
      label="Empresa"
      value={companiesRecord[id].name}
      iconClass="ti ti-building"
      {...{ type }}
    />
  )
}
