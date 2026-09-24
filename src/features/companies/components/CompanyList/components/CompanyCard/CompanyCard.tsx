import './CompanyCard.css'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Chip, EmailChip } from '@/shared/components'
import { CompanyUpsertButton } from '../CompanyUpsertButton/CompanyUpsertButton'
import type { Company } from '@/features/companies/company.types'
import { classList, varList } from '@/shared/helpers'

interface CompanyCardProps {
  i: number
  data: Company
}

export const CompanyCard = ({
  i,
  data: { id, name, email, createdAt, updatedAt, _count },
}: CompanyCardProps) => {
  return (
    <li
      className={classList(
        'cmp-company-card',
        'card-style',
        'hover-highlight',
        'show-animation-item',
      )}
      style={varList({ i })}
    >
      <div className="content">
        <header>
          <h1 className="text">{name}</h1>
          <div className="actions">
            <CompanyUpsertButton
              action="UPDATE"
              currentData={{ id, name, email }}
            />
          </div>
        </header>
        <hr />
        <ul>
          <ul>
            <EmailChip {...{ email }} />
            {_count && (
              <Chip
                label="Cantidad de contrataciones"
                value={_count.procurements}
                iconClass="ti ti-file-certificate"
              />
            )}
            <UserActivityChip dateTime={createdAt} />
            <UserActivityChip dateTime={updatedAt} activity="updated" />
          </ul>
        </ul>
      </div>
    </li>
  )
}
