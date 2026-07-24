'use server'

import { signUpRequest } from '../requests/sign-up-request'
import { SignUpSchema } from '../../schemas/auth.schema'

export async function signUpAction(dto: SignUpSchema) {
  try {
    const user = await signUpRequest(dto)
    return { data: user, error: null }
  } catch (error) {
    const err = error as {
      json?: () => Promise<{ message?: string }>
      message?: string
    }
    let errorMessage = 'Erro ao realizar cadastro.'
    if (err && typeof err.json === 'function') {
      try {
        const errBody = await err.json()
        errorMessage = errBody.message || errorMessage
      } catch {}
    } else if (err && err.message) {
      errorMessage = err.message
    }
    return { data: null, error: errorMessage }
  }
}
