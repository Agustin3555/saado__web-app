import { useOriginsStore } from '../../store/useOrigins.store'
import { Chip } from '@/shared/components'

interface OriginChip {
  id?: number | null
}

export const OriginChip = ({ id }: OriginChip) => {
  const originsRecord = useOriginsStore(s => s.originsRecord)!

  if (!id) return null

  return (
    <Chip title="Origen" iconClass="ti ti-send-2">
      <p>{originsRecord[id].name}</p>
    </Chip>
  )
}
