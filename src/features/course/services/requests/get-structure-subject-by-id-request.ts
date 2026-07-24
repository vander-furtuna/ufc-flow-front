import { api } from '@/lib/ky-api'
import { StructureSubject } from '../../types'

export async function getStructureSubjectByIdRequest(
  id: string,
): Promise<StructureSubject> {
  return api.get(`structure-subjects/${id}`).json<StructureSubject>()
}
