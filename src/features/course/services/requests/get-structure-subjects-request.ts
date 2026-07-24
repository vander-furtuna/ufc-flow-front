import { api } from '@/lib/ky-api'
import { StructureSubject } from '../../types'

export async function getStructureSubjectsRequest(): Promise<
  StructureSubject[]
> {
  return api.get('structure-subjects').json<StructureSubject[]>()
}
