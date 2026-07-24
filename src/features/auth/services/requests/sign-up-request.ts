import { api } from '@/lib/ky-api'
import { SignUpSchema } from '../../schemas/auth.schema'
import { User } from '../../types'

export async function signUpRequest(data: SignUpSchema): Promise<User> {
  return api.post('auth/sign-up', { json: data }).json<User>()
}
