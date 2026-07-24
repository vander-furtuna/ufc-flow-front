import { api } from '@/lib/ky-api'

export async function deleteUserRequest(id: string): Promise<void> {
  await api.delete(`users/${id}`)
}
