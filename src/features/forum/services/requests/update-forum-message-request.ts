import { api } from '@/lib/ky-api'
import { UpdateForumMessageDto } from '../../types'

export async function updateForumMessageRequest(
  id: string,
  dto: UpdateForumMessageDto,
): Promise<{ message: string }> {
  return api
    .patch(`forum-messages/${id}`, { json: dto })
    .json<{ message: string }>()
}
