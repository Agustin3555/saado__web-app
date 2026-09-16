import type { ProcurementType } from '../procurements/procurement.types'

export interface SimpleDocument {
  id: number
  originId?: number

  name: string
  updatedAt: string

  procurementTypes: {
    procurementType: ProcurementType
    isActive: boolean
  }[]
  controls: unknown[]
}

export interface RelDocumentControl {
  id: number
  controlId: number
  verifierId: number | null

  procurementType: ProcurementType | null
}

export interface Document extends SimpleDocument {
  createdAt: string

  controls: RelDocumentControl[]
}
