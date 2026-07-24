import { api } from '@/lib/ky-api'

export async function deleteSubjectRequest(id: string): Promise<void> {
  await api.delete(`subjects/${id}`)
}
