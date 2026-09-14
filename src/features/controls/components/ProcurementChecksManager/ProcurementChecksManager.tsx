import './DocumentManagerCard.css'
import type { Document } from '@/features/docs/document.types'

interface ProcurementChecksManagerProps {
  data: Document
}

export const ProcurementChecksManager = ({
  data: { id, name, originId, updatedAt, createdAt },
}: ProcurementChecksManagerProps) => {
  return (
    <article className="cmp-procurement-checks-manager show-animation-item">
      <h1 className="text">{name}</h1>
      <ul className="by-procurement-type"></ul>
    </article>
  )
}
