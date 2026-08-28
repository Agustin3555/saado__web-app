import './Log.css'
import { Line } from '../Line/Line'
import type { ChangeLog, LogData } from '@/features/files/changeLog.types'
import { classList } from '@/shared/helpers'

interface LogProps extends Pick<ChangeLog, 'createdAt'> {
  data: LogData
}

const ICONS_MATCH: Record<LogData['logType'], string> = {
  info: 'ti ti-git-commit',
  processing: 'ti ti-rotate-clockwise-2',
  success: 'ti ti-square-check',
  warning: 'ti ti-alert-triangle',
  error: 'ti ti-exclamation-circle',
}

export const Log = ({
  data: { logType: type, message },
  createdAt,
}: LogProps) => {
  return (
    <Line
      handlingClass={classList('cmp-log', type)}
      iconClass={ICONS_MATCH[type]}
      title={message}
      {...{ createdAt }}
    />
  )
}
