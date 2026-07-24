import { api } from '@/lib/ky-api'
import { ForumMessage, CreateForumMessageDto } from '../../types'

export async function createForumMessageRequest(
  dto: CreateForumMessageDto,
): Promise<ForumMessage> {
  return api.post('forum-messages', { json: dto }).json<ForumMessage>()
}
