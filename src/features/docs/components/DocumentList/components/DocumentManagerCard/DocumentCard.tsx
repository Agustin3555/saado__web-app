import './DocumentCard.css'
import { ResourceCard, type ResourceCardProps } from '@/shared/layouts'
import { Chip } from '@/shared/components'
import { OriginChip } from '@/features/origins/components/OriginChip/OriginChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import type { SimpleDocument } from '@/features/docs/document.types'
import { ProcurementTypeChip } from '@/features/procurements/components/ProcurementTypeChip/ProcurementTypeChip'

interface DocumentManagerCardProps extends Pick<ResourceCardProps, 'i'> {
  data: SimpleDocument
}

export const DocumentCard = ({
  i,
  data: { id, name, originId, updatedAt, procurementTypes, controls },
}: DocumentManagerCardProps) => {
  const activeProcurementTypes = procurementTypes.filter(t => t.isActive)

  return (
    <ResourceCard
      handlingClass="cmp-document-card"
      title={name}
      detailsStyle="matrix"
      {...{ i, id }}
    >
      <ul>
        <OriginChip id={originId} type="detail" />
        <UserActivityChip
          dateTime={updatedAt}
          activity="updated"
          type="detail"
        />
        <Chip label="Controles" value={controls.length} type="detail" />
      </ul>
      <ul className="types">
        {activeProcurementTypes.map(({ procurementType }) => (
          <ProcurementTypeChip key={procurementType} value={procurementType} />
        ))}
      </ul>
    </ResourceCard>
  )
}
