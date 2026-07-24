import { z } from 'zod'

export const createSubjectSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
})

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>
