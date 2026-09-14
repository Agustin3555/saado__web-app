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

export interface Document extends SimpleDocument {
  createdAt: string
}
