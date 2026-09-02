import './LogList.css'
import { useEffect, useRef, useState } from 'react'
import { useSocketStore } from '@/infra/ws/useSocket.store'
import { Banner, Icon, Loader } from '@/shared/components'
import { FormatError, Log, Update } from './components'
import {
  changeLogSchema,
  type ChangeLog,
  type LogData,
  type UpdateData,
} from '@/features/files/changeLog.types'
import { privateInstance } from '@/infra/http/axios/instances'
import {
  subscribeFile,
  unsubscribeFile,
} from '@/features/files/ws/file.emitters'
import { onChangelogCreated } from '@/features/files/ws/file.listeners'
import { classList } from '@/shared/helpers'

const changeLogValidator = (changeLog: unknown) => {
  return changeLogSchema.safeParse(changeLog).success
}

const getChangeLogs = async (fileId: number) => {
  const { data } = await privateInstance.get<ChangeLog[]>(
    `files/${fileId}/change-logs`,
  )
  return data
}

interface ChangeLogValid {
  changeLog: ChangeLog
  isFormatValid: boolean
}

interface LogsProps {
  fileId: number
}

export const LogList = ({ fileId }: LogsProps) => {
  const socket = useSocketStore(s => s.socket)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [changeLogs, setChangeLogs] = useState<ChangeLogValid[]>()
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToBot = () => {
    requestAnimationFrame(() => {
      const content = contentRef.current
      if (!content) return
      content.scrollTop = content.scrollHeight
    })
  }

  const handleToggleClick = () => {
    setOpen(prev => {
      const nextOpen = !prev

      if (nextOpen) {
        setLoading(true)

        getChangeLogs(fileId)
          .then(rawChangeLogs =>
            setChangeLogs(
              rawChangeLogs.map(changeLog => ({
                changeLog,
                isFormatValid: changeLogValidator(changeLog),
              })),
            ),
          )
          .finally(() => {
            setLoading(false)
            scrollToBot()
          })
      }

      return nextOpen
    })
  }

  useEffect(() => {
    if (!socket || !open) return

    subscribeFile(socket, fileId)

    return () => {
      unsubscribeFile(socket, fileId)
    }
  }, [socket, fileId, open])

  useEffect(() => {
    if (!socket || !open) return

    const unsubscribe = onChangelogCreated(
      socket,
      fileId,
      (changeLog: ChangeLog) => {
        // TODO: si es de tipo verdict, actualizar el veredicto

        const newItem: ChangeLogValid = {
          changeLog,
          isFormatValid: changeLogValidator(changeLog),
        }

        setChangeLogs(prev => (prev ? [...prev, newItem] : [newItem]))
        scrollToBot()
      },
    )

    return unsubscribe
  }, [socket, fileId, open])

  return (
    <div className={classList('cmp-log-list', { open })}>
      <div className="content" ref={contentRef}>
        {changeLogs?.length ? (
          <ul>
            {changeLogs.map(({ isFormatValid, changeLog: cl }) => {
              if (!isFormatValid)
                return (
                  <FormatError
                    key={cl.id}
                    data={cl.data}
                    createdAt={cl.createdAt}
                  />
                )
              if (cl.type === 'LOG')
                return (
                  <Log
                    key={cl.id}
                    data={cl.data as LogData}
                    createdAt={cl.createdAt}
                  />
                )
              if (cl.type === 'UPDATE')
                return (
                  <Update
                    key={cl.id}
                    data={cl.data as UpdateData}
                    createdAt={cl.createdAt}
                  />
                )
            })}
          </ul>
        ) : (
          <Banner text="Sin seguimiento" />
        )}
        <div className={classList('loader-container', { loading })}>
          <Loader />
        </div>
      </div>
      <button className="ui-s" onClick={handleToggleClick}>
        <Icon iconClass="ti ti-chevron-down" />
        <small>{open ? 'Cerrar' : 'Abrir'} seguimiento</small>
      </button>
    </div>
  )
}
