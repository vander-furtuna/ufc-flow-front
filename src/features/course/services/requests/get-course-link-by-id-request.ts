import { api } from '@/lib/ky-api'
import { CourseLink } from '../../types'

export async function getCourseLinkByIdRequest(
  id: string,
): Promise<CourseLink> {
  return api.get(`course-links/${id}`).json<CourseLink>()
}
