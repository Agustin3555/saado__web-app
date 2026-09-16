import './ControlCard.css'
import type { Control } from '@/features/controls/control.types'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Chip } from '@/shared/components'
import { classList, varList } from '@/shared/helpers'
import { EditControlButton } from './components'

interface ControlCardProps {
  i: number
  data: Control
}

export const ControlCard = ({
  i,
  data: { id, name, description, createdAt, updatedAt, documents },
}: ControlCardProps) => {
  return (
    <li
      className={classList(
        'cmp-control-card',
        'card-style',
        'hover-highlight',
        'show-animation-item',
      )}
      style={varList({ i })}
    >
      <div className="content">
        <header>
          <h1 className="text">{name}</h1>
          <div className="actions">
            <EditControlButton {...{ id, name, description }} />
          </div>
        </header>
        <hr />
        <ul>
          <li>
            <p className="desc text">{description}</p>
          </li>
          <ul>
            <Chip
              label="En documentos"
              value={documents.length}
              iconClass="ti ti-folder-open"
            />
            <UserActivityChip dateTime={createdAt} />
            <UserActivityChip dateTime={updatedAt} activity="updated" />
          </ul>
        </ul>
      </div>
    </li>
  )
}
