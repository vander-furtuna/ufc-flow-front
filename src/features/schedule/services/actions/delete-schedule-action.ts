'use server'

import { deleteScheduleRequest } from '../requests/delete-schedule-request'

export async function deleteScheduleAction(id: string) {
  try {
    await deleteScheduleRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao excluir simulação',
    }
  }
}
