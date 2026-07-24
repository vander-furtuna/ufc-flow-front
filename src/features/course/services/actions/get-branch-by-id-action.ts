'use server'

import { getBranchByIdRequest } from '../requests/get-branch-by-id-request'

export async function getBranchByIdAction(id: string) {
  try {
    const data = await getBranchByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Vertente não encontrada' }
  }
}
