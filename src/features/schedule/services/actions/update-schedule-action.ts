'use server'

import { updateScheduleRequest } from '../requests/update-schedule-request'
import { UpdateScheduleDto } from '../../types'

export async function updateScheduleAction(id: string, dto: UpdateScheduleDto) {
  try {
    const res = await updateScheduleRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar simulação' }
  }
}
