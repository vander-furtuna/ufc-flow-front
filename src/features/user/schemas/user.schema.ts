import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2, 'O nome deve conter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
  roles: z.array(z.enum(['ALUNO', 'MODERADOR', 'ADMIN'])).optional(),
  courseId: z.string().optional(),
  registrationNumber: z.string().optional(),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  name: z.string().min(2, 'O nome deve conter pelo menos 2 caracteres').optional(),
  email: z.string().email('E-mail inválido').optional(),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres').optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
