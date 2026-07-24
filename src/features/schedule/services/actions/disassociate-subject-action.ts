'use server'

import { disassociateSubjectRequest } from '../requests/disassociate-subject-request'

export async function disassociateSubjectAction(id: string, subjectId: string) {
  try {
    await disassociateSubjectRequest(id, subjectId)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao remover disciplina da simulação',
    }
  }
}
