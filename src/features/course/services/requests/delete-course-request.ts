import { api } from '@/lib/ky-api'

export async function deleteCourseRequest(id: string): Promise<void> {
  await api.delete(`courses/${id}`)
}
