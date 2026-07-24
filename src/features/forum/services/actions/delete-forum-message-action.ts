'use server'

import { deleteForumMessageRequest } from '../requests/delete-forum-message-request'

export async function deleteForumMessageAction(id: string) {
  try {
    await deleteForumMessageRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao excluir mensagem',
    }
  }
}
