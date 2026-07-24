import { api } from '@/lib/ky-api'

export async function deleteForumMessageRequest(id: string): Promise<void> {
  await api.delete(`forum-messages/${id}`)
}
