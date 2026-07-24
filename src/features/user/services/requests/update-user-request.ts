import { api } from '@/lib/ky-api'
import { UpdateUserDto } from '../../types'

export async function updateUserRequest(
  id: string,
  data: UpdateUserDto,
): Promise<{ message: string }> {
  return api.patch(`users/${id}`, { json: data }).json<{ message: string }>()
}
