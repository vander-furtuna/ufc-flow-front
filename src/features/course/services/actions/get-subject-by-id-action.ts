'use server'

import { getSubjectByIdRequest } from '../requests/get-subject-by-id-request'

export async function getSubjectByIdAction(id: string) {
  try {
    const data = await getSubjectByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Disciplina não encontrada' }
  }
}
