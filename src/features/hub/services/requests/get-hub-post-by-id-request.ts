import { api } from '@/lib/ky-api'
import { HubPost } from '../../types'

export async function getHubPostByIdRequest(id: string): Promise<HubPost> {
  return api.get(`hub-posts/${id}`).json<HubPost>()
}
