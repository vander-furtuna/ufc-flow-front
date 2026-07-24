import { api } from '@/lib/ky-api'
import { CourseLink } from '../../types'

export async function getCourseLinksRequest(): Promise<CourseLink[]> {
  return api.get('course-links').json<CourseLink[]>()
}
