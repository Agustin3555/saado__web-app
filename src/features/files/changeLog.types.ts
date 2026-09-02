import { z } from 'zod'

const logDataSchema = z.object({
  logType: z.enum(['info', 'processing', 'success', 'warning', 'error']),
  message: z.string(),
})

export type LogData = z.infer<typeof logDataSchema>

const updateDataSchema = z.object({
  message: z.string(),
  byUserId: z.number(),
  valueType: z.enum(['verdict', 'document', 'data']),
  prevValue: z.unknown(),
  newValue: z.unknown(),
  comments: z.string().optional(),
})

export type UpdateData = z.infer<typeof updateDataSchema>

export const changeLogSchema = z.object({
  id: z.number(),
  type: z.enum(['LOG', 'UPDATE', 'START_BLOCK', 'END_BLOCK']),
  data: z.union([logDataSchema, updateDataSchema]).optional(),
  createdAt: z.string(),
})

export type ChangeLog = z.infer<typeof changeLogSchema>
