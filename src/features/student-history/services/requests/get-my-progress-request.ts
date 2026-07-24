import { api } from '@/lib/ky-api'
import { StudentHistoryProgressResponse } from '../../types'

export async function getMyProgressRequest(): Promise<
  StudentHistoryProgressResponse[]
> {
  return api
    .get('student-histories/progress')
    .json<StudentHistoryProgressResponse[]>()
}
