import './ProcurementCard.css'
import { useCompaniesStore } from '@/features/company/store/useCompanies.store'
import { Link } from 'wouter'
import type { SimpleProcurement } from '../../procurement.types'
import { varList } from '@/shared/helpers/varList.helper'
import { PROCUREMENT_TYPE_INFO } from '../../procurement.const'

interface ProcurementCardProps {
  i?: number
  data: SimpleProcurement
}

export const ProcurementCard = ({
  i,
  data: { id, companyId, procurementType, name, numeroExpediente, updatedAt },
}: ProcurementCardProps) => {
  const companiesRecord = useCompaniesStore(s => s.companiesRecord)!

  return (
    <li
      className="cmp-procurement-card hover-highlight show-animation-item"
      title={name ?? undefined}
      style={varList({ i })}
    >
      <div className="status-text">Aprobado</div>
      <div className="content">
        <Link href={`/${id}`}>{numeroExpediente}</Link>
        <div className="details">
          <p>
            <span className="title">Tipo de contratación:</span>
            <span className="value">
              {PROCUREMENT_TYPE_INFO[procurementType]}
            </span>
          </p>
          <p>
            <span className="title">Contratación:</span>
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
