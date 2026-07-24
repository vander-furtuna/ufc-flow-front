import { api } from '@/lib/ky-api'

export async function disassociateSubjectRequest(
  id: string,
  subjectId: string,
): Promise<void> {
  await api.delete(`schedules/${id}/subjects/${subjectId}`)
}
