import { api } from '@/lib/ky-api'
import { CurricularStructure } from '../../types'

export async function getCurricularStructureByIdRequest(
  id: string,
): Promise<CurricularStructure> {
  return api.get(`curricular-structures/${id}`).json<CurricularStructure>()
}
