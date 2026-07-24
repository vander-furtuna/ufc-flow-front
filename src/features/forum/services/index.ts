import { api } from '@/lib/ky-api'
import { ForumMessage, CreateForumMessageDto, UpdateForumMessageDto } from '../types'

export async function getForumMessagesRequest(): Promise<ForumMessage[]> {
  return api.get('forum-messages').json<ForumMessage[]>()
}

export async function getForumMessageByIdRequest(id: string): Promise<ForumMessage> {
  return api.get(`forum-messages/${id}`).json<ForumMessage>()
}

export async function createForumMessageRequest(
  dto: CreateForumMessageDto,
): Promise<ForumMessage> {
  return api.post('forum-messages', { json: dto }).json<ForumMessage>()
}

export async function updateForumMessageRequest(
  id: string,
  dto: UpdateForumMessageDto,
): Promise<{ message: string }> {
  return api.patch(`forum-messages/${id}`, { json: dto }).json<{ message: string }>()
}

export async function deleteForumMessageRequest(id: string): Promise<void> {
  await api.delete(`forum-messages/${id}`)
}
