'use server'

import { deleteHistoryEntryRequest } from '../requests/delete-history-entry-request'

export async function deleteHistoryEntryAction(id: string) {
  try {
    await deleteHistoryEntryRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao remover disciplina do histórico',
    }
  }
}
