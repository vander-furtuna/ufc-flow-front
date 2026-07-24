'use server'

import { deleteCurricularStructureRequest } from '../requests/delete-curricular-structure-request'

export async function deleteCurricularStructureAction(id: string) {
  try {
    await deleteCurricularStructureRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao excluir estrutura curricular',
    }
  }
}
