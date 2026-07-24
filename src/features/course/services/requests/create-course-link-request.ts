import { api } from '@/lib/ky-api'
import { CourseLink, CreateCourseLinkDto } from '../../types'

export async function createCourseLinkRequest(
  dto: CreateCourseLinkDto,
): Promise<CourseLink> {
  return api.post('course-links', { json: dto }).json<CourseLink>()
}
