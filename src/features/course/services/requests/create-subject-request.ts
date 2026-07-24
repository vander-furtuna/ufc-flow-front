import { api } from '@/lib/ky-api'
import { Subject, CreateSubjectDto } from '../../types'

export async function createSubjectRequest(
  dto: CreateSubjectDto,
): Promise<Subject> {
  return api.post('subjects', { json: dto }).json<Subject>()
}
