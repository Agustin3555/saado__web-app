import type { File } from '../files/file.types'

export type ProcurementType =
  | 'CONT_DIRECTA'
  | 'CONC_PRECIOS'
  | 'LIC_PRIV'
  | 'LIC_PUBL'

export interface SimpleProcurement {
  id: number
  companyId: number | null

  procurementType: ProcurementType
  name: string | null
  numeroExpediente: string | null
  updatedAt: string
}

export interface Procurement extends SimpleProcurement {
  createdByUserId: number
  updatedByUserId: number

  createdAt: string
  files: File[]
}
