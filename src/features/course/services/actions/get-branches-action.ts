'use server'

import { getBranchesRequest } from '../requests/get-branches-request'

export async function getBranchesAction() {
  try {
    const data = await getBranchesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar vertentes' }
  }
}
