import { api } from '@/lib/ky-api'
import { UpdateCourseLinkDto } from '../../types'

export async function updateCourseLinkRequest(
  id: string,
  dto: UpdateCourseLinkDto,
): Promise<{ message: string }> {
  return api
    .patch(`course-links/${id}`, { json: dto })
    .json<{ message: string }>()
}
