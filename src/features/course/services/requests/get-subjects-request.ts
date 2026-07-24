import { api } from '@/lib/ky-api'
import { Subject } from '../../types'

export async function getSubjectsRequest(): Promise<Subject[]> {
  return api.get('subjects').json<Subject[]>()
}
