'use server'

import { getStructureSubjectByIdRequest } from '../requests/get-structure-subject-by-id-request'

export async function getStructureSubjectByIdAction(id: string) {
  try {
    const data = await getStructureSubjectByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Mapeamento de disciplina não encontrado',
    }
  }
}
