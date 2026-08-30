import './Update.css'
import type { ReactNode } from 'react'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { Button, Chip, Dropdown, Icon } from '@/shared/components'
import type { ChangeLog, UpdateData } from '@/features/files/changeLog.types'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Line } from '../Line/Line'
import { classList } from '@/shared/helpers'
import type { File } from '@/features/files/file.types'
import { getVerdict } from '@/features/files/helpers/getVerdict.helper'

const VerdictChip = ({ verdict }: { verdict: File['verdict'] }) => {
  const { id, text } = getVerdict(verdict)

  return (
    <Chip handlingClass={classList('document', id)}>
      <p className="status-text">{text}</p>
    </Chip>
  )
}

const DocumentChip = ({ id }: { id: number | null }) => {
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!

  return id === null ? (
    <Chip iconClass="ti ti-circle-dashed" />
  ) : (
    <Chip title={documentsRecord[id].name} clip>
      <p>{documentsRecord[id].name}</p>
    </Chip>
  )
}

const DataChip = ({ object }: { object: any | null }) => {
  return object === null ? (
    <Chip iconClass="ti ti-circle-dashed" />
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
        {comments && (
          <Dropdown
            opener={attrs => (
              <Button
                title="Ver comentario"
                iconClass="ti ti-message"
                size="s"
                htmlAttrs={attrs}
              />
            )}
          >
            <Icon iconClass="ti ti-quote" />
            <p className="text">{comments}</p>
          </Dropdown>
        )}
      </div>
    </Line>
  )
}
