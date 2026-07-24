import { z } from 'zod'

export const updateScheduleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  year: z.number().int().min(2000).optional(),
  period: z.number().int().min(1).max(2).optional(),
})

export type UpdateScheduleSchema = z.infer<typeof updateScheduleSchema>
