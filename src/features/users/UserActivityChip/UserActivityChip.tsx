import './UserActivityChip.css'
import { useUsersStore } from '../store/useUsers.store'
import { Chip, JoinChips, type ChipProps } from '@/shared/components'

type Activity = 'created' | 'updated'

const infoMap: Record<Activity, { action: string; iconClass: string }> = {
  created: {
    action: 'Creado',
    iconClass: 'ti ti-target',
  },
  updated: {
    action: 'Actualizado',
    iconClass: 'ti ti-clock-edit',
  },
}

interface UserActivityChipProps extends Pick<ChipProps, 'type'> {
  dateTime?: string
  userId?: number
  activity?: Activity
}

export const UserActivityChip = ({
  activity = 'created',
  userId,
  dateTime,
  type,
}: UserActivityChipProps) => {
  const usersRecord = useUsersStore(s => s.usersRecord)!

  const shortDateTime =
    dateTime &&
    Temporal.Instant.from(dateTime)
      .toZonedDateTimeISO(Temporal.Now.timeZoneId())
      .toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short',
      })

  const longDateTime =
    dateTime &&
    Temporal.Instant.from(dateTime)
      .toZonedDateTimeISO(Temporal.Now.timeZoneId())
      .toLocaleString('es-ES', {
        dateStyle: 'long',
        timeStyle: 'short',
      })

  const user = userId && usersRecord[userId]
  const info = infoMap[activity]

  return (
    <JoinChips handlingClass="cmp-user-activity">
      {shortDateTime && longDateTime && (
        <Chip
          handlingClass="datetime"
          label={`${info.action} el`}
          value={longDateTime}
          iconClass={info.iconClass}
          {...{ type }}
        >
          <p>{shortDateTime}</p>
        </Chip>
      )}
      {user && (
        <Chip
          handlingClass="user"
          label={`${info.action} por`}
          value={`${user.lastName}, ${user.firstName}`}
          {...{ type }}
        >
          <div className="icon"></div>
          <span>{user.lastName}</span>
        </Chip>
      )}
    </JoinChips>
  )
}
