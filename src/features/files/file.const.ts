import type { VerdictType } from './file.types'

export const VERDICT_MATCH: Record<VerdictType, { title: string; id: string }> =
  {
    UNDEFINED: { id: 'undefined', title: 'Indefinido' },
    REJECTED: { id: 'rejected', title: 'Rechazado' },
    UNCERTAIN: { id: 'uncertain', title: 'Incierto' },
    APPROVED: { id: 'approved', title: 'Aprobado' },
  }
