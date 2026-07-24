'use server'

import { getSchedulesRequest } from '../requests/get-schedules-request'

export async function getSchedulesAction() {
  try {
    const data = await getSchedulesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar simulações de grade',
    }
  }
}
