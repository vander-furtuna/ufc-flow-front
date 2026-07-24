'use server'

import { createScheduleRequest } from '../requests/create-schedule-request'
import { CreateScheduleDto } from '../../types'

export async function createScheduleAction(dto: CreateScheduleDto) {
  try {
    const data = await createScheduleRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar simulação' }
  }
}
