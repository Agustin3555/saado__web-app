import './LogList.css'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/shared/components'
import { Log, Update } from './components'
import { classList } from '@/shared/helpers'
import { changeLogs } from './mock.const'

interface LogsProps {
  fileId: number
}

export const LogList = ({ fileId }: LogsProps) => {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollTo({ top: contentRef.current.scrollHeight })
    }
  }, [open])

  return (
    <div className={classList('cmp-log-list', { open })}>
      <div className="content" ref={contentRef}>
        <ul>
          {changeLogs.map((changeLog, i) => {
            if (changeLog.type === 'LOG') return <Log key={i} {...changeLog} />
            if (changeLog.type === 'UPDATE')
              return <Update key={i} {...changeLog} />
          })}
        </ul>
      </div>
      <button className="ui-s" onClick={() => setOpen(prev => !prev)}>
        <Icon iconClass="ti ti-chevron-down" />
        <small>{open ? 'Cerrar' : 'Abrir'} seguimiento</small>
      </button>
    </div>
  )
}
