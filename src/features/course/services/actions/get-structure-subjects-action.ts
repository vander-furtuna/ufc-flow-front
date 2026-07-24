'use server'

import { getStructureSubjectsRequest } from '../requests/get-structure-subjects-request'

export async function getStructureSubjectsAction() {
  try {
    const data = await getStructureSubjectsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar mapeamentos de disciplinas',
    }
  }
}
