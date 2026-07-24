import { api } from '@/lib/ky-api'
import {
  UserCourseRoleResponse,
  StudentHistoryProgressResponse,
  AddHistoryEntryDto,
  UpdateHistoryEntryDto,
} from '../types'

export async function linkCourseRequest(
  formData: FormData,
): Promise<UserCourseRoleResponse> {
  return api
    .post('student-histories/link-course', {
      body: formData,
    })
    .json<UserCourseRoleResponse>()
}

export async function getMyProgressRequest(): Promise<StudentHistoryProgressResponse[]> {
  return api.get('student-histories/progress').json<StudentHistoryProgressResponse[]>()
}

export async function addHistoryEntryRequest(
  dto: AddHistoryEntryDto,
): Promise<StudentHistoryProgressResponse> {
  return api
    .post('student-histories/progress', { json: dto })
    .json<StudentHistoryProgressResponse>()
}

export async function updateHistoryEntryRequest(
  id: string,
  dto: UpdateHistoryEntryDto,
): Promise<{ message: string }> {
  return api
    .patch(`student-histories/progress/${id}`, { json: dto })
    .json<{ message: string }>()
}

export async function deleteHistoryEntryRequest(id: string): Promise<void> {
  await api.delete(`student-histories/progress/${id}`)
}
