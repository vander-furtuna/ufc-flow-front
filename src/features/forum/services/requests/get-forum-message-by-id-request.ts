import { api } from '@/lib/ky-api'
import { ForumMessage } from '../../types'

export async function getForumMessageByIdRequest(
  id: string,
): Promise<ForumMessage> {
  return api.get(`forum-messages/${id}`).json<ForumMessage>()
}
