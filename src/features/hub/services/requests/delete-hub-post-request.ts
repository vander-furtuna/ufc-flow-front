import { api } from '@/lib/ky-api'

export async function deleteHubPostRequest(id: string): Promise<void> {
  await api.delete(`hub-posts/${id}`)
}
