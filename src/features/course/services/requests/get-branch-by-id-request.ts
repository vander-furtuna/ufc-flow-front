import { api } from '@/lib/ky-api'
import { Branch } from '../../types'

export async function getBranchByIdRequest(id: string): Promise<Branch> {
  return api.get(`branches/${id}`).json<Branch>()
}
