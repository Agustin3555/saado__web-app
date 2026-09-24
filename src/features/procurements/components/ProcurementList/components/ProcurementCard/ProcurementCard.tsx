import './ProcurementCard.css'
import { ResourceCard, type ResourceCardProps } from '@/shared/layouts'
import { Chip } from '@/shared/components'
import { ProcurementTypeChip } from '../../../ProcurementTypeChip/ProcurementTypeChip'
import { CompanyChip } from '@/features/companies/components/CompanyChip/CompanyChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import type { SimpleProcurement } from '../../../../procurement.types'
import { classList } from '@/shared/helpers'
import { VERDICT_MATCH } from '@/features/files/file.const'

interface ProcurementCardProps extends Pick<ResourceCardProps, 'i'> {
  data: SimpleProcurement
}

export const ProcurementCard = ({
  i,
  data: {
    id,
    companyId,
    verdict,
    procurementType,
    name,
    numeroExpediente,
    updatedAt,
  },
}: ProcurementCardProps) => {
  const verdictInfo = VERDICT_MATCH[verdict]

  return (
    <ResourceCard
      handlingClass={classList(
        'cmp-procurement-card',
        'verdict',
        verdictInfo.id,
      )}
      title={numeroExpediente}
      statusSlot={<div className="verdict-value">{verdictInfo.title}</div>}
      {...{ i, id }}
    >
      <ProcurementTypeChip value={procurementType} type="detail" />
      <CompanyChip id={companyId} type="detail" />
      <Chip label="Obra" value={name ?? '-'} type="detail" clip />
      <UserActivityChip dateTime={updatedAt} activity="updated" type="detail" />
    </ResourceCard>
  )
}
