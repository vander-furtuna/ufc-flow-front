import { api } from '@/lib/ky-api'
import { Subject } from '../../types'

export async function getSubjectByIdRequest(id: string): Promise<Subject> {
  return api.get(`subjects/${id}`).json<Subject>()
}
