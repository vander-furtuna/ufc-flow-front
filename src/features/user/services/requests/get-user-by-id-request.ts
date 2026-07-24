import { api } from '@/lib/ky-api'
import { UserResponse } from '../../types'

export async function getUserByIdRequest(id: string): Promise<UserResponse> {
  return api.get(`users/${id}`).json<UserResponse>()
}
