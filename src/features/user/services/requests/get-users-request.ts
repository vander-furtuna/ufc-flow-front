import { api } from '@/lib/ky-api'
import { UserResponse } from '../../types'

export async function getUsersRequest(): Promise<UserResponse[]> {
  return api.get('users').json<UserResponse[]>()
}
