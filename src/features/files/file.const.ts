import type { VerdictType } from './file.types'

export const VERDICT_MATCH: Record<VerdictType, string> = {
  REJECTED: 'Rechazado',
  UNCERTAIN: 'Incierto',
  APPROVED: 'Aprobado',
}
