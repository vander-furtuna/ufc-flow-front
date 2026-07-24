'use server'

import { deleteStructureSubjectRequest } from '../requests/delete-structure-subject-request'

export async function deleteStructureSubjectAction(id: string) {
  try {
    await deleteStructureSubjectRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao remover mapeamento de disciplina',
    }
  }
}
