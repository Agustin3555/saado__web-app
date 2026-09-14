import { useOriginsStore } from '../../store/useOrigins.store'
import { Chip, type ChipProps } from '@/shared/components'

interface OriginChip extends Pick<ChipProps, 'type'> {
  id?: number | null
}

export const OriginChip = ({ id, type }: OriginChip) => {
  const originsRecord = useOriginsStore(s => s.originsRecord)!

  if (!id) return null

  return (
    <Chip
      label="Origen"
      value={originsRecord[id].name}
      iconClass="ti ti-send-2"
      {...{ type }}
    />
  )
}
