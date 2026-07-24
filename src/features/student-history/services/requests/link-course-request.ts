import { api } from '@/lib/ky-api'
import { UserCourseRoleResponse } from '../../types'

export async function linkCourseRequest(
  formData: FormData,
): Promise<UserCourseRoleResponse> {
  return api
    .post('student-histories/link-course', {
      body: formData,
    })
    .json<UserCourseRoleResponse>()
}
