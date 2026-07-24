'use server'

import { getMyProgressRequest } from '../requests/get-my-progress-request'

export async function getMyProgressAction() {
  try {
    const data = await getMyProgressRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar histórico acadêmico',
    }
  }
}
