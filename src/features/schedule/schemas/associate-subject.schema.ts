import { z } from 'zod'

export const associateSubjectSchema = z.object({
  subjectId: z.string().min(1, 'ID da disciplina é obrigatório'),
})

export type AssociateSubjectSchema = z.infer<typeof associateSubjectSchema>
