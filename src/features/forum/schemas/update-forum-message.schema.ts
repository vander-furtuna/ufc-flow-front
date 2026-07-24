import { z } from 'zod'

export const updateForumMessageSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').optional(),
  reportsCount: z.number().int().optional(),
})

export type UpdateForumMessageSchema = z.infer<typeof updateForumMessageSchema>
