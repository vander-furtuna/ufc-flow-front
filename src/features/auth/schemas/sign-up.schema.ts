import { z } from 'zod'
import { ufcStudentEmailSchema } from './student-email.schema'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, 'O nome deve conter pelo menos 2 caracteres')
      .max(100, 'Nome muito longo'),
    email: ufcStudentEmailSchema,
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'A senha deve conter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
