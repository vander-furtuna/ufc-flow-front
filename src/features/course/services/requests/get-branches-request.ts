import { api } from '@/lib/ky-api'
import { Branch } from '../../types'

export async function getBranchesRequest(): Promise<Branch[]> {
  return api.get('branches').json<Branch[]>()
}
