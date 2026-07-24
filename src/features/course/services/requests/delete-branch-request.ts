import { api } from '@/lib/ky-api'

export async function deleteBranchRequest(id: string): Promise<void> {
  await api.delete(`branches/${id}`)
}
