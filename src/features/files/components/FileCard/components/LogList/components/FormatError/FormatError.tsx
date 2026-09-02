import './FormatError.css'
import { Dropdown, Icon } from '@/shared/components'
import { Line } from '../Line/Line'
import type { ChangeLog } from '@/features/files/changeLog.types'

interface LogProps extends Pick<ChangeLog, 'createdAt'> {
  data: unknown
}

export const FormatError = ({ data, createdAt }: LogProps) => {
  return (
    <Line
      handlingClass="cmp-format-error"
      iconClass="ti ti-question-mark"
      title="Formato incorrecto"
      actions={
        <Dropdown
          opener={attrs => (
            <button title="Ver datos" {...attrs}>
              <Icon iconClass="ti ti-code-dots" />
            </button>
          )}
        >
          <pre className="text">{JSON.stringify(data, undefined, 2)}</pre>
        </Dropdown>
      }
      {...{ createdAt }}
    />
  )
}
