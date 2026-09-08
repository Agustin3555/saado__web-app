import './ProcurementHeader.css'
import type { Procurement } from '@/features/procurements/procurement.types'
import { CompanyChip } from '@/features/company/components/CompanyChip/CompanyChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { VerdictButton } from './components'

interface ProcurementHeaderProps {
  data: Pick<
    Procurement,
    | 'companyId'
    | 'createdByUserId'
    | 'updatedByUserId'
    | 'name'
    | 'numeroExpediente'
    | 'createdAt'
    | 'updatedAt'
  >
}

export const ProcurementHeader = ({
  data: {
    companyId,
    createdByUserId,
    updatedByUserId,
    name,
    numeroExpediente,
    createdAt,
    updatedAt,
  },
}: ProcurementHeaderProps) => {
  return (
    <header className="cmp-procurement-header">
      <h1 className="text">
        <span>{numeroExpediente}</span>
        <strong>{name ?? '-'}</strong>
      </h1>
      <ul>
        <VerdictButton />
        <CompanyChip id={companyId} />
        <UserActivityChip
          userId={updatedByUserId}
          dateTime={updatedAt}
          activity="updated"
        />
        <UserActivityChip userId={createdByUserId} dateTime={createdAt} />
      </ul>
    </header>
  )
}
