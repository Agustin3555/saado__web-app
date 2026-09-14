import './ProcurementCard.css'
import { ResourceCard, type ResourceCardProps } from '@/shared/layouts'
import { Chip } from '@/shared/components'
import { ProcurementTypeChip } from '../../../ProcurementTypeChip/ProcurementTypeChip'
import { CompanyChip } from '@/features/company/components/CompanyChip/CompanyChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import type { SimpleProcurement } from '../../../../procurement.types'

interface ProcurementCardProps extends Pick<ResourceCardProps, 'i'> {
  data: SimpleProcurement
}

export const ProcurementCard = ({
  i,
  data: { id, companyId, procurementType, name, numeroExpediente, updatedAt },
}: ProcurementCardProps) => {
  return (
    <ResourceCard
      handlingClass="cmp-procurement-card"
      title={numeroExpediente}
      statusSlot={<div className="status-text">Aprobado</div>}
      {...{ i, id }}
    >
      <ProcurementTypeChip value={procurementType} type="detail" />
      <CompanyChip id={companyId} type="detail" />
      <Chip label="Obra" value={name ?? '-'} type="detail" clip />
      <UserActivityChip dateTime={updatedAt} activity="updated" type="detail" />
    </ResourceCard>
  )
}
