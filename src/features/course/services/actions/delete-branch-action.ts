'use server'

import { deleteBranchRequest } from '../requests/delete-branch-request'

export async function deleteBranchAction(id: string) {
  try {
    await deleteBranchRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir vertente' }
  }
}
