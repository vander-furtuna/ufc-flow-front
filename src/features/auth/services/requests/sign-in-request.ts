import { api } from '@/lib/ky-api'
import { SignInSchema } from '../../schemas/auth.schema'
import { SignInResponse } from '../../types'

export async function signInRequest(
  data: SignInSchema,
): Promise<SignInResponse> {
  return api.post('auth/sign-in', { json: data }).json<SignInResponse>()
}
