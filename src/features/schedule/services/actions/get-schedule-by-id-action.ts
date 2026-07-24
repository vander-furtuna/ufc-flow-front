'use server'

import { getScheduleByIdRequest } from '../requests/get-schedule-by-id-request'

export async function getScheduleByIdAction(id: string) {
  try {
    const data = await getScheduleByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Simulação não encontrada' }
  }
}
