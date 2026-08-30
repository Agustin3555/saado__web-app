import type { ChangeLog } from '@/features/files/changeLog.types'

export const changeLogs: ChangeLog[] = [
  {
    type: 'START_BLOCK',
    createdAt: '2026-08-18T13:15:44.191Z',
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      logType: 'processing',
      message: 'Extrayendo texto',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Buscando palabras claves',
      logType: 'info',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Palabras claves encontradas: `palabra 1`, `palabra 2`',
      logType: 'success',
    },
  },
  {
    type: 'UPDATE',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Tipo de documento actualizado',
      byUserId: 0,
      valueType: 'document',
      prevValue: 16,
      newValue: 6,
    },
  },
  {
    type: 'END_BLOCK',
    createdAt: '2026-08-18T13:15:44.191Z',
  },
  {
    type: 'START_BLOCK',
    createdAt: '2026-08-18T13:15:44.191Z',
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Comenzando análisis especifico',
      logType: 'info',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Identificando vigencia',
      logType: 'info',
    },
  },
  {
    type: 'UPDATE',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Metadatos actualizados',
      byUserId: 0,
      valueType: 'data',
      prevValue: null,
      newValue: { vigencia: '2026-12-18' },
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Determinando veredicto',
      logType: 'info',
    },
  },
  {
    type: 'UPDATE',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Veredicto actualizado',
      byUserId: 0,
      valueType: 'verdict',
      prevValue: null,
      newValue: 'UNCERTAIN',
    },
  },
  {
    type: 'END_BLOCK',
    createdAt: '2026-08-18T13:15:44.191Z',
  },
  {
    type: 'UPDATE',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Veredicto actualizado',
      byUserId: 5,
      valueType: 'verdict',
      prevValue: 'APPROVED',
      newValue: 'REJECTED',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Warning',
      logType: 'warning',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Error',
      logType: 'error',
    },
  },
  {
    type: 'LOG',
    createdAt: '2026-08-18T13:15:44.191Z',
    data: {
      message: 'Processing',
      logType: 'processing',
    },
  },
]
