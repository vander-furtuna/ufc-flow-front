import { z } from 'zod'

export const postTypeEnum = z.enum([
  'NEWS',
  'EVENT',
  'SCHOLARSHIP',
  'PROJECT',
  'OTHER',
])

export const createHubPostSchema = z.object({
  type: postTypeEnum,
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  courseId: z.string().min(1, 'ID do curso é obrigatório'),
  authorId: z.string().min(1, 'ID do autor é obrigatório'),
})

export type CreateHubPostSchema = z.infer<typeof createHubPostSchema>

export const updateHubPostSchema = createHubPostSchema.partial()
export type UpdateHubPostSchema = z.infer<typeof updateHubPostSchema>
