import { api } from '@/lib/ky-api'
import { StudentHistoryProgressResponse, AddHistoryEntryDto } from '../../types'

export async function addHistoryEntryRequest(
  dto: AddHistoryEntryDto,
): Promise<StudentHistoryProgressResponse> {
  return api
    .post('student-histories/progress', { json: dto })
    .json<StudentHistoryProgressResponse>()
}
