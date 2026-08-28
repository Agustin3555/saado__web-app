import './Update.css'
import type { ReactNode } from 'react'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { Chip, Icon } from '@/shared/components'
import type { ChangeLog, UpdateData } from '@/features/files/changeLog.types'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Line } from '../Line/Line'
import { classList } from '@/shared/helpers'

type VerdictType = 'REJECT' | 'UNCERTAIN' | 'APPROVE'

const VERDICT_MATCH: Record<VerdictType, string> = {
  REJECT: 'Rechazado',
  UNCERTAIN: 'Incierto',
  APPROVE: 'Aprobado',
}

const VerdictChip = ({ verdict }: { verdict: VerdictType }) => {
  return (
    <Chip handlingClass={classList('document', verdict.toLowerCase())}>
      <p>{VERDICT_MATCH[verdict]}</p>
    </Chip>
  )
}

const DocumentChip = ({ id }: { id: number }) => {
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!

  return (
    <Chip title={documentsRecord[id].name} clip>
      <p>{documentsRecord[id].name}</p>
    </Chip>
  )
}

const DataChip = ({ object }: { object: any }) => {
  return (
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
  data: { message, byUserId, valueType, prevValue, newValue },
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
        {prevValue === null ? (
          <Chip iconClass="ti ti-circle-dashed" />
        ) : (
          <div className="prev">{value(prevValue)}</div>
        )}
        <Icon iconClass="ti ti-arrow-narrow-right-dashed" />
        {newValue === null ? (
          <Chip iconClass="ti ti-circle-dashed" />
        ) : (
          <div className="new">{value(newValue)}</div>
        )}
        <p>por</p>
        <UserActivityChip userId={byUserId} activity="updated" />
      </div>
    </Line>
  )
}
