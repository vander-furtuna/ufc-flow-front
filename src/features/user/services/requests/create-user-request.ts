import { api } from '@/lib/ky-api'
import { UserResponse, CreateUserDto } from '../../types'

export async function createUserRequest(
  data: CreateUserDto,
): Promise<UserResponse> {
  return api.post('users', { json: data }).json<UserResponse>()
}
