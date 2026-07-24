'use server'

import { getCurricularStructuresRequest } from '../requests/get-curricular-structures-request'

export async function getCurricularStructuresAction() {
  try {
    const data = await getCurricularStructuresRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar estruturas curriculares',
    }
  }
}
