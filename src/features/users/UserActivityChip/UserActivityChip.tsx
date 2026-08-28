import './UserActivityChip.css'
import { useUsersStore } from '../store/useUsers.store'
import { Chip, JoinChips, type ChipProps } from '@/shared/components'

type Activity = 'created' | 'updated'

const infoMap: Record<Activity, Pick<ChipProps, 'title' | 'iconClass'>> = {
  created: {
    title: 'Creado',
    iconClass: 'ti ti-target',
  },
  updated: {
    title: 'Actualizado',
    iconClass: 'ti ti-clock-edit',
  },
}

interface UserActivityChipProps {
  dateTime?: string
  userId?: number
  activity?: Activity
}

export const UserActivityChip = ({
  activity = 'created',
  userId,
  dateTime,
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
          title={`${info.title} el ${longDateTime}`}
          iconClass={info.iconClass}
        >
          <p>{shortDateTime}</p>
        </Chip>
      )}
      {user && (
        <Chip
          handlingClass="user"
          title={`${info.title} por ${user.lastName}, ${user.firstName}`}
        >
          <div className="icon"></div>
          <span>{user.lastName}</span>
        </Chip>
      )}
    </JoinChips>
  )
}
