import { api } from '@/lib/ky-api'

export async function deleteHistoryEntryRequest(id: string): Promise<void> {
  await api.delete(`student-histories/progress/${id}`)
}
