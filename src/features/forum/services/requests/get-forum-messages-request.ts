import { api } from '@/lib/ky-api'
import { ForumMessage } from '../../types'

export async function getForumMessagesRequest(): Promise<ForumMessage[]> {
  return api.get('forum-messages').json<ForumMessage[]>()
}
