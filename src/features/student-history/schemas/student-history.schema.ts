import { z } from 'zod'

export const historyStatusEnum = z.enum([
  'CONCLUIDA',
  'REPROVADA',
  'TRANCADA',
  'APROVEITADA',
])

export const addHistoryEntrySchema = z.object({
  userCourseId: z.string().min(1, 'Vínculo do curso é obrigatório'),
  structureSubjectId: z.string().min(1, 'Componente curricular é obrigatório'),
  status: historyStatusEnum,
  finalGrade: z.number().min(0).max(10).optional(),
  periodDone: z.string().min(1, 'Período é obrigatório'),
})

export type AddHistoryEntrySchema = z.infer<typeof addHistoryEntrySchema>

export const updateHistoryEntrySchema = z.object({
  status: historyStatusEnum.optional(),
  finalGrade: z.number().min(0).max(10).optional(),
  periodDone: z.string().optional(),
})

export type UpdateHistoryEntrySchema = z.infer<typeof updateHistoryEntrySchema>
