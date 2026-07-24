import { z } from 'zod'

export const createForumMessageSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  courseId: z.string().min(1, 'ID do curso é obrigatório'),
  authorId: z.string().min(1, 'ID do autor é obrigatório'),
  parentId: z.string().optional(),
})

export type CreateForumMessageSchema = z.infer<typeof createForumMessageSchema>
