export interface LogData {
  logType: 'info' | 'processing' | 'success' | 'warning' | 'error'
  message: string
}

type ValueType = 'verdict' | 'document' | 'data'

export interface UpdateData {
  message: string
  byUserId: number
  valueType: ValueType
  prevValue: unknown
  newValue: unknown
  comments?: string
}

type ChangeLogType = 'LOG' | 'UPDATE' | 'START_BLOCK' | 'END_BLOCK'

export interface ChangeLog {
  id?: number
  type: ChangeLogType
  data?: LogData | UpdateData
  createdAt: string
}
