import './Update.css'
import type { ReactNode } from 'react'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { Chip, CurrentCommentButton, Icon } from '@/shared/components'
import type { ChangeLog, UpdateData } from '@/features/files/changeLog.types'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Line } from '../Line/Line'
import { classList } from '@/shared/helpers'
import type { File } from '@/features/files/file.types'
import { VERDICT_MATCH } from '@/features/files/file.const'

// BUG: errores con los chips

const VoidChip = () => {
  return <Chip iconClass="ti ti-circle-dashed" />
}

const VerdictChip = ({ verdict }: { verdict: File['verdict'] }) => {
  const { id, title } = VERDICT_MATCH[verdict]

  return (
    <Chip handlingClass={classList('verdict', id)}>
      <p className="verdict-value">{title}</p>
    </Chip>
  )
}

const DocumentChip = ({ id }: { id: number | null }) => {
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!

  return id === null ? (
    <VoidChip />
  ) : (
    <Chip label={documentsRecord[id].name} clip>
      <p>{documentsRecord[id].name}</p>
    </Chip>
  )
}

const DataChip = ({ object }: { object: unknown }) => {
  return object === null ? (
    <VoidChip />
  ) : (
    <Chip clip>
      <code>{JSON.stringify(object)}</code>
    </Chip>
  )
}

const VALUE_COMPONENT_MATCH: Record<
  UpdateData['valueType'],
  (value: any) => ReactNode
> = {
  verdict: v => <VerdictChip verdict={v} />,
  document: v => <DocumentChip id={v} />,
  data: v => <DataChip object={v} />,
}

interface UpdateProps extends Pick<ChangeLog, 'createdAt'> {
  data: UpdateData
}

export const Update = ({
  createdAt,
  data: { message, byUserId, valueType, prevValue, newValue, comments },
}: UpdateProps) => {
  const value = VALUE_COMPONENT_MATCH[valueType]

  return (
    <Line
      handlingClass={classList('cmp-update', valueType)}
      iconClass="ti ti-pencil"
      title={message}
      {...{ createdAt }}
    >
      <div className="change">
        <div className="prev">{value(prevValue)}</div>
        <Icon iconClass="ti ti-arrow-narrow-right-dashed" />
        <div className="new">{value(newValue)}</div>
        <p>por</p>
        <UserActivityChip userId={byUserId} activity="updated" />
        {comments && <CurrentCommentButton comment={comments} />}
      </div>
    </Line>
  )
}
