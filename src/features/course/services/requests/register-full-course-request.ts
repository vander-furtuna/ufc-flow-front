import { api } from '@/lib/ky-api'
import { RegisterCoursePayloadDto } from '../../types'

export async function registerFullCourseRequest(
  payload: RegisterCoursePayloadDto,
): Promise<{ message: string }> {
  return api
    .post('courses/register-full', { json: payload })
    .json<{ message: string }>()
}
