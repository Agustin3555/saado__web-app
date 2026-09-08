import type { ProcurementType } from './procurement.types'

export const PROCUREMENT_TYPE_INFO: Record<ProcurementType, string> = {
  CONT_DIRECTA: 'Contratación Directa',
  CONC_PRECIOS: 'Concurso de Precios',
  LIC_PRIV: 'Licitación Privada',
  LIC_PUBL: 'Licitación Pública',
}
