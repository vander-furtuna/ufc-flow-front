import { z } from 'zod'

export const createScheduleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  year: z.number().int().min(2000, 'Ano inválido'),
  period: z.number().int().min(1).max(2, 'Período deve ser 1 ou 2'),
  userCourseId: z.string().min(1, 'ID do vínculo do usuário é obrigatório'),
  courseId: z.string().min(1, 'ID do curso é obrigatório'),
})

export type CreateScheduleSchema = z.infer<typeof createScheduleSchema>
