import type { File, VerdictType } from '../files/file.types'

export type ProcurementType =
  | 'CONT_DIRECTA'
  | 'CONC_PRECIOS'
  | 'LIC_PRIV'
  | 'LIC_PUBL'

export interface SimpleProcurement {
  id: number
  companyId: number | null

  verdict: VerdictType
  verdictCommentary: string | null
  procurementType: ProcurementType
  name: string | null
  numeroExpediente: string
  updatedAt: string
}

export interface Procurement extends SimpleProcurement {
  createdAt: string
  files: File[]
}
