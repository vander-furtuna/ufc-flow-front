import { api } from '@/lib/ky-api'

export async function deleteScheduleRequest(id: string): Promise<void> {
  await api.delete(`schedules/${id}`)
}
