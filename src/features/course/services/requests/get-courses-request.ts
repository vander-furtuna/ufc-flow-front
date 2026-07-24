import { api } from '@/lib/ky-api'
import { SimplifiedCourse } from '../../types'

export async function getCoursesRequest(): Promise<SimplifiedCourse[]> {
  return api.get('courses').json<SimplifiedCourse[]>()
}
