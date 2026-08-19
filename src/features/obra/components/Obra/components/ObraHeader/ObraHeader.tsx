import './ObraHeader.css'
import type { Obra } from '@/features/obra/obra.types'
import { CompanyChip } from '@/features/company/components/CompanyChip/CompanyChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'

interface ObraHeaderProps {
  data: Pick<
    Obra,
    | 'companyId'
    | 'createdByUserId'
    | 'updatedByUserId'
    | 'name'
    | 'numeroExpediente'
    | 'createdAt'
    | 'updatedAt'
  >
}

export const ObraHeader = ({
  data: {
    companyId,
    createdByUserId,
    updatedByUserId,
    name,
    numeroExpediente,
    createdAt,
    updatedAt,
  },
}: ObraHeaderProps) => {
  return (
    <header className="cmp-obra-header">
      <h1 className="text">
        <span>{numeroExpediente}</span>
        <strong>{name ?? '-'}</strong>
      </h1>
      <ul>
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
