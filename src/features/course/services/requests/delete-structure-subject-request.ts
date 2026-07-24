import { api } from '@/lib/ky-api'

export async function deleteStructureSubjectRequest(id: string): Promise<void> {
  await api.delete(`structure-subjects/${id}`)
}
