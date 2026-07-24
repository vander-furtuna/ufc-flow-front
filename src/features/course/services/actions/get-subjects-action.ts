'use server'

import { getSubjectsRequest } from '../requests/get-subjects-request'

export async function getSubjectsAction() {
  try {
    const data = await getSubjectsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar disciplinas' }
  }
}
