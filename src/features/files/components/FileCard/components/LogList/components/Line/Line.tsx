import './Line.css'
import type { ReactNode } from 'react'
import { Icon } from '@/shared/components'
import type { ChangeLog } from '@/features/files/changeLog.types'
import { classList } from '@/shared/helpers'

interface LineProps extends Pick<ChangeLog, 'createdAt'> {
  handlingClass: string
  iconClass: string
  title: string
  actions?: ReactNode
  children?: ReactNode
}

export const Line = ({
  handlingClass,
  iconClass,
  title,
  createdAt,
  actions,
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
          <p className="title text">
            {title}
            {actions}
          </p>
          <small>{formattedDateTime}</small>
        </header>
        {children}
      </div>
    </li>
  )
}
