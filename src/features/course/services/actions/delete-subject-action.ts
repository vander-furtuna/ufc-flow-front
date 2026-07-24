'use server'

import { deleteSubjectRequest } from '../requests/delete-subject-request'

export async function deleteSubjectAction(id: string) {
  try {
    await deleteSubjectRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao excluir disciplina',
    }
  }
}
