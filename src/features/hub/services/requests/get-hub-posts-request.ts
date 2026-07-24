import { api } from '@/lib/ky-api'
import { HubPost } from '../../types'

export async function getHubPostsRequest(): Promise<HubPost[]> {
  return api.get('hub-posts').json<HubPost[]>()
}
