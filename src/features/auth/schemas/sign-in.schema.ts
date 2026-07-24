import { z } from 'zod'
import { ufcStudentEmailSchema } from './student-email.schema'

export const signInSchema = z.object({
  email: ufcStudentEmailSchema,
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})

export type SignInSchema = z.infer<typeof signInSchema>
