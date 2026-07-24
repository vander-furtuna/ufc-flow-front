import { api } from '@/lib/ky-api'
import { User } from '../../types'

export async function getProfileRequest(): Promise<User> {
  return api.get('auth/profile').json<User>()
}
