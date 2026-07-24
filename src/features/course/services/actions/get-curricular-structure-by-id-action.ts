'use server'

import { getCurricularStructureByIdRequest } from '../requests/get-curricular-structure-by-id-request'

export async function getCurricularStructureByIdAction(id: string) {
  try {
    const data = await getCurricularStructureByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Estrutura curricular não encontrada',
    }
  }
}
