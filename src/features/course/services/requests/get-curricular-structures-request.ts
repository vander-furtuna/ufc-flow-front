import { api } from '@/lib/ky-api'
import { CurricularStructure } from '../../types'

export async function getCurricularStructuresRequest(): Promise<
  CurricularStructure[]
> {
  return api.get('curricular-structures').json<CurricularStructure[]>()
}
