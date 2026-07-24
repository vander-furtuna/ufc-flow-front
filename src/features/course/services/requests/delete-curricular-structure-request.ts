import { api } from '@/lib/ky-api'

export async function deleteCurricularStructureRequest(
  id: string,
): Promise<void> {
  await api.delete(`curricular-structures/${id}`)
}
