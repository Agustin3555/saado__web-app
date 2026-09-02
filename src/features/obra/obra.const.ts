import type { TipoContratacion } from './obra.types'

export const TIPO_CONTRATACION_INFO: Record<TipoContratacion, string> = {
  CONT_DIRECTA: 'Contratación Directa',
  CONC_PRECIOS: 'Concurso de Precios',
  LIC_PRIV: 'Licitación Privada',
  LIC_PUBL: 'Licitación Pública',
}
