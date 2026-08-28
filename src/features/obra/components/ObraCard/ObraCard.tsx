import './ObraCard.css'
import { useCompaniesStore } from '@/features/company/store/useCompanies.store'
import { Link } from 'wouter'
import type { SimpleObra } from '../../obra.types'
import { varList } from '@/shared/helpers/varList.helper'

interface ObraCardProps {
  i?: number
  data: SimpleObra
}

export const ObraCard = ({
  i,
  data: { id, companyId, numeroExpediente, name, updatedAt },
}: ObraCardProps) => {
  const companiesRecord = useCompaniesStore(s => s.companiesRecord)!

  const status = 'Aprobado'

  return (
    <li
      className="cmp-obra-card show-animation-item"
      title={name ?? undefined}
      style={varList({ i })}
    >
      <div className="status-text">{status}</div>
      <div className="content">
        <Link href={`/${id}`}>{numeroExpediente}</Link>
        <div className="details">
          <p>
            <span className="title">Obra:</span>
            <span className="value">{name ?? '-'}</span>
          </p>
          {companyId && (
            <p>
              <span className="title">Empresa:</span>
              <span className="value">{companiesRecord[companyId].name}</span>
            </p>
          )}
          <p>
            <span className="title">Actualizado:</span>
            <span className="value">
              {Temporal.Instant.from(updatedAt)
                .toZonedDateTimeISO(Temporal.Now.timeZoneId())
                .toLocaleString('es-ES', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
            </span>
          </p>
        </div>
      </div>
    </li>
  )
}
