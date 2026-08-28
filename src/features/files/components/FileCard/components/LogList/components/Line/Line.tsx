import './Line.css'
import type { ReactNode } from 'react'
import { Icon } from '@/shared/components'
import type { ChangeLog } from '@/features/files/changeLog.types'
import { classList } from '@/shared/helpers'

interface LineProps extends Pick<ChangeLog, 'createdAt'> {
  handlingClass: string
  iconClass: string
  title: string
  children?: ReactNode
}

export const Line = ({
  handlingClass,
  iconClass,
  title,
  createdAt,
  children,
}: LineProps) => {
  const formattedDateTime = Temporal.Instant.from(createdAt)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

  return (
    <li className={classList('cmp-line', handlingClass)}>
      <Icon {...{ iconClass }} />
      <div className="content">
        <header>
          <p className="title text">{title}</p>
          <small>{formattedDateTime}</small>
        </header>
        {children}
      </div>
    </li>
  )
}
