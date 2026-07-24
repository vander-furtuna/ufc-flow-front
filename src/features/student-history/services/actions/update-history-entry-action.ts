'use server'

import { updateHistoryEntryRequest } from '../requests/update-history-entry-request'
import { UpdateHistoryEntryDto } from '../../types'

export async function updateHistoryEntryAction(
  id: string,
  dto: UpdateHistoryEntryDto,
) {
  try {
    const res = await updateHistoryEntryRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar histórico' }
  }
}
