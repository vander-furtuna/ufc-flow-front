import { z } from 'zod'

export const linkTypeEnum = z.enum([
  'SITE',
  'DOCUMENTO',
  'VIDEO',
  'ARQUIVO_GERAL',
  'OUTRO',
])

export const createCourseLinkSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  url: z.string().url('URL inválida'),
  description: z.string().optional(),
  iconName: z.string().optional(),
  type: linkTypeEnum,
  courseId: z.string().min(1, 'ID do curso é obrigatório'),
})

export type CreateCourseLinkSchema = z.infer<typeof createCourseLinkSchema>
