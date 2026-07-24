import { api } from '@/lib/ky-api'
import { HubPost, CreateHubPostDto } from '../../types'

export async function createHubPostRequest(
  dto: CreateHubPostDto,
): Promise<HubPost> {
  return api.post('hub-posts', { json: dto }).json<HubPost>()
}
