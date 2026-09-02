import type { File } from '../files/file.types'

export type TipoContratacion =
  | 'CONT_DIRECTA'
  | 'CONC_PRECIOS'
  | 'LIC_PRIV'
  | 'LIC_PUBL'

export interface SimpleObra {
  id: number
  companyId: number | null

  tipoContratacion: TipoContratacion
  name: string | null
  numeroExpediente: string | null
  updatedAt: string
}

export interface Obra extends SimpleObra {
  createdByUserId: number
  updatedByUserId: number

  createdAt: string
  files: File[]
}
