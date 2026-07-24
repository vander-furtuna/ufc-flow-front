import { api } from '@/lib/ky-api'
import { UpdateHubPostDto } from '../../types'

export async function updateHubPostRequest(
  id: string,
  dto: UpdateHubPostDto,
): Promise<{ message: string }> {
  return api.patch(`hub-posts/${id}`, { json: dto }).json<{ message: string }>()
}
