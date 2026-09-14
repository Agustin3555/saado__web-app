import { PROCUREMENT_TYPE_INFO } from '../../procurement.const'
import type { ProcurementType } from '../../procurement.types'
import { Chip, type ChipProps } from '@/shared/components'

interface ProcurementTypeChipProps extends Pick<ChipProps, 'type'> {
  value: ProcurementType | null
}

export const ProcurementTypeChip = ({
  value,
  type,
}: ProcurementTypeChipProps) => {
  if (!value) return null

  const name = PROCUREMENT_TYPE_INFO[value]

  return (
    <Chip
      label="Tipo de contratación"
      value={name}
      iconClass="ti ti-hash"
      {...{ type }}
    />
  )
}
