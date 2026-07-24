import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve conter pelo menos 2 caracteres')
    .optional(),
  email: z.string().email('E-mail inválido').optional(),
  password: z
    .string()
    .min(6, 'A senha deve conter pelo menos 6 caracteres')
    .optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
