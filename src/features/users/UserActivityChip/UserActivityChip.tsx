import './UserActivityChip.css'
import { useUsersStore } from '../store/useUsers.store'
import { Chip, type ChipProps } from '@/shared/components'

type Activity = 'created' | 'updated'

const infoMap: Record<Activity, Pick<ChipProps, 'title' | 'iconClass'>> = {
  created: {
    title: 'Creado por',
    iconClass: 'ti ti-target',
  },
  updated: {
    title: 'Actualizado por',
    iconClass: 'ti ti-clock-edit',
  },
}

interface UserActivityChipProps {
  userId?: number
  dateTime: string
  activity?: Activity
}

export const UserActivityChip = ({
  userId,
  activity = 'created',
  dateTime,
}: UserActivityChipProps) => {
  const usersRecord = useUsersStore(s => s.usersRecord)!

  const formattedDateTime = Temporal.Instant.from(dateTime)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

  return (
    <Chip
      handlingClass="cmp-user-activity"
      {...infoMap[activity]}
      value={formattedDateTime}
    >
      {userId && (
        <div className="user">
          <div className="icon"></div>
          <span>{usersRecord[userId].lastName}</span>
        </div>
      )}
    </Chip>
  )
}
