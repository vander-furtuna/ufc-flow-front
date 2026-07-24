import { api } from '@/lib/ky-api'
import { RegisterCoursePayloadDto } from '../../types'

export async function getCourseByIdentifierRequest(
  identifier: string,
): Promise<RegisterCoursePayloadDto> {
  return api.get(`courses/${identifier}`).json<RegisterCoursePayloadDto>()
}
