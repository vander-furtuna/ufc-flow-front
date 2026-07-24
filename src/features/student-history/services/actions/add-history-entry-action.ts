'use server'

import { addHistoryEntryRequest } from '../requests/add-history-entry-request'
import { AddHistoryEntryDto } from '../../types'

export async function addHistoryEntryAction(dto: AddHistoryEntryDto) {
  try {
    const data = await addHistoryEntryRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao adicionar disciplina ao histórico',
    }
  }
}
