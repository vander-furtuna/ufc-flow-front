import { api } from '@/lib/ky-api'

export async function deleteCourseLinkRequest(id: string): Promise<void> {
  await api.delete(`course-links/${id}`)
}
