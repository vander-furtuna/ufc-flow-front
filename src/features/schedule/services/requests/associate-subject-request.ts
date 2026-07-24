import { api } from '@/lib/ky-api'
import { AssociateSubjectDto } from '../../types'

export async function associateSubjectRequest(
  id: string,
  dto: AssociateSubjectDto,
): Promise<{ message: string }> {
  return api
    .post(`schedules/${id}/subjects`, { json: dto })
    .json<{ message: string }>()
}
