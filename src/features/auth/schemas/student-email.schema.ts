import { z } from 'zod'

export const ufcStudentEmailSchema = z
  .email('Insira um e-mail válido')
  .min(1, 'O e-mail é obrigatório')
  .refine((email) => email.toLowerCase().endsWith('@alu.ufc.br'), {
    message: 'Use um e-mail institucional @alu.ufc.br',
  })
