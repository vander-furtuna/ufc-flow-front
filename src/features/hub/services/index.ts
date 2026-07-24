import { api } from '@/lib/ky-api'
import { HubPost, CreateHubPostDto, UpdateHubPostDto } from '../types'

export async function getHubPostsRequest(): Promise<HubPost[]> {
  return api.get('hub-posts').json<HubPost[]>()
}

export async function getHubPostByIdRequest(id: string): Promise<HubPost> {
  return api.get(`hub-posts/${id}`).json<HubPost>()
}

export async function createHubPostRequest(dto: CreateHubPostDto): Promise<HubPost> {
  return api.post('hub-posts', { json: dto }).json<HubPost>()
}

export async function updateHubPostRequest(
  id: string,
  dto: UpdateHubPostDto,
): Promise<{ message: string }> {
  return api.patch(`hub-posts/${id}`, { json: dto }).json<{ message: string }>()
}

export async function deleteHubPostRequest(id: string): Promise<void> {
  await api.delete(`hub-posts/${id}`)
}
