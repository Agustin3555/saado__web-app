import type { ChangeLog } from '../changeLog.types'
import { SERVER_EVENTS } from './file.events'
import type { Socket } from 'socket.io-client'

export type AnalysisStatus = 'STARTED' | 'FINISHED' | 'FAILED'

export const onAnalysisStatusChanged = (
  socket: Socket,
  callback: (data: { fileId: number; status: AnalysisStatus }) => void,
) => {
  const event = SERVER_EVENTS.ANALYSIS_STATUS_CHANGED
  socket.on(event, callback)

  return () => {
    socket.off(event, callback)
  }
}

export const onChangelogCreated = (
  socket: Socket,
  fileId: number,
  callback: (data: ChangeLog) => void,
) => {
  const event = SERVER_EVENTS.CHANGELOG_CREATED

  const listener = (payload: { fileId: number; changeLog: ChangeLog }) => {
    if (payload.fileId !== fileId) return
    callback(payload.changeLog)
  }

  socket.on(event, listener)

  return () => {
    socket.off(event, listener)
  }
}
