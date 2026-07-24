import { z } from 'zod'
import { historyStatusEnum } from './add-history-entry.schema'

export const updateHistoryEntrySchema = z.object({
  status: historyStatusEnum.optional(),
  finalGrade: z.number().min(0).max(10).optional(),
  periodDone: z.string().optional(),
})

export type UpdateHistoryEntrySchema = z.infer<typeof updateHistoryEntrySchema>
